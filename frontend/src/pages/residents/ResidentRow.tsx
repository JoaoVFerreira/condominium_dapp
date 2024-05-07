import { ethers } from "ethers";
import { Resident, hasManagerPermissions } from "../../services/Web3Service";

type Props = {
  data: Resident;
  onDelete: Function;
};

export default function ResidentRow ({ data, onDelete }: Props) {

  function getNextPayment() {
    let dateMs = 0;
    if (data.nextPayment) {
      dateMs = ethers.toNumber(data.nextPayment) * 1000;
    }
    const text = !dateMs ? "Never Payed" : new Date(dateMs).toDateString();
    let color = "text-success";
    if (!dateMs || dateMs < Date.now()) color = "text-danger";
    return (
      <p className={"text-xs mb-0 ms-3 " + color}>
        {text}
      </p>
    )
  }

  function btnDeleteClick() {
    if (window.confirm("Are you to delete this resident?")) {
      onDelete(data.wallet);
    }
  }

  return (
    <tr>
      <td>
        <div className="d-flex px-3 py-1">
          <div className="d-flex flex-column justify-content-center">
            <h6 className="mb-0 text-sm">{data.wallet}</h6>
          </div>
        </div>
      </td>
      <td>
        <p className="text-xs font-weight-bold mb-0 px-3">{ethers.toBigInt(data.residence).toString()}</p>
      </td>
      <td>
        <p className="text-xs font-weight-bold mb-0 px-3">{JSON.stringify(data.isCounselor)}</p>
      </td>
      <td>
        { getNextPayment() }
      </td>
      <td>
        {
          hasManagerPermissions() ? (
            <>
              <a href={`/residents/edit/${data.wallet}`} className="btn btn-info btn-sm me-1">
                <i className="material-icons text-sm">edit</i>
              </a>
              <a href="#" className="btn btn-danger btn-sm me-1" onClick={btnDeleteClick}>
                <i className="material-icons text-sm">delete</i>
              </a>
            </>
          ) : <></>
        }
      </td>
    </tr>
  )
}