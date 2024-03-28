import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import SwitchInput from "../../components/SwitchInput";
import { Resident, addResident, isManager } from '../../services/Web3Service';

export default function ResidentPage() {

  const navigate = useNavigate();
  const [isLoading, setIsLoanding] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [resident, setResident] = useState<Resident>({} as Resident);

  function onResidentChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setResident(prevState => ({...prevState, [ev.target.id]: ev.target.value }));
  }

  async function btnSaveClick() {
    if (resident) {
      setMessage("Connecting to wallet...wait..");
      try {
        const newResident = await addResident(resident.wallet, resident.residence);
        navigate(`/residents?tx=${newResident?.hash}`)
      } catch (err: any) {
        setMessage(err.message);
      }
    }
  } 

  return (
    <>
    <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                  <h6 className="text-white text-capitalize ps-3">
                    <i className="material-icons opacity-10 me-2">group</i>
                    New Resident
                    </h6>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                {
                  isLoading ? (
                    <div className="row ms-3">
                      <div className="col-md-6 mb-3">
                        <p>
                          <i className="material-icons opacity-10 me-2">hourglass_empty</i>
                          Loading...
                        </p>
                      </div>
                    </div>
                  ) : <></>
                }
                <div className="row ms-3">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="wallet">Wallet Address:</label>
                        <div className="input-group input-group-outline">
                          <input className="form-control" type="text" id="wallet" value={resident.wallet} placeholder="0x000..." onChange={onResidentChange}/>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="row ms-3">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="residence">Residence Number:</label>
                      <div className="input-group input-group-outline">
                        <input className="form-control" type="number" id="residence" value={resident.residence} placeholder="1101" onChange={onResidentChange}/>
                      </div>
                    </div>
                  </div>
                </div>
                {
                  isManager() ? (
                    <div className="row ms-3">
                      <div className="col-md-6 mb-3">
                        <div className="form-group">
                        <SwitchInput id="isCouncelor" text="is Counselor ?" isChecked={resident.isCounselor}  onChange={onResidentChange} />
                        </div>
                      </div>
                    </div>
                  ) : <></>
                }
                <div className="row ms-3">
                  <div className="col-md-12 mb-3">
                    <button className="btn bg-gradient-dark me-2" onClick={btnSaveClick}>
                      <i className="material-icons opacity-10 me-2">save</i>
                      Save Settings
                    </button>
                    <span className="text-danger">
                      { message }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
    </>
  )
}