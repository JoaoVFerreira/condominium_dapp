import { useState, useEffect } from "react";
import { payQuota, Resident, getQuota, getResident } from "../services/Web3Service";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { ethers } from "ethers";

function Quota() {

  const [resident, setResident] = useState<Resident>({} as Resident);
  const [quota, setQuota] = useState<ethers.BigNumberish>(0n);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    setIsLoading(true);
    const quotaPromise = getQuota();
    const residentPromise = getResident(localStorage.getItem("account") || "");
    Promise.all([quotaPromise, residentPromise])
      .then(results => {
        setQuota(results[0]);
        setResident(results[1]);
        setIsLoading(false);
      })
      .catch(err => {
        setMessage(err.message);
        setIsLoading(false);
      });
  }, []);

  function btnPayQuotaClick() {
    setIsLoading(true);
    setMessage("Connecting to MetaMask...wait...");
    payQuota(resident.residence, quota)
      .then(tx => {
        setMessage("Quota paid! It may take some minutes to have effect.");
        setIsLoading(false);
      })
      .catch(err => {
        setMessage(err.message);
        setIsLoading(false);
      });
  }

  function getDate(timestamp: ethers.BigNumberish): string {
    const timestampMs = ethers.toNumber(timestamp ?? 0) * 1000;
    if (!timestampMs) return "Never Paid";
    return new Date(timestampMs).toDateString();
  }

  function getNextPaymentClass() {
    let className = "input-group input-group-outline";
    const dateMs = ethers.toNumber(resident.nextPayment ?? 0) * 1000;
    if (!dateMs || dateMs < Date.now()) return className + " is-invalid";
    return className + " is-valid";
  }

  function shouldPay(): boolean {
    return (ethers.toNumber(resident.nextPayment ?? 0) * 1000) <= Date.now();
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
                      <i className="material-icons opacity-10 me-2">payments</i>
                      Quota
                    </h6>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  {
                    isLoading
                      ? <Loader />
                      : <></>
                  }
                  <div className="row ms-3">
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="quota">Monthly Quota (ETH):</label>
                        <div className="input-group input-group-outline">
                          <input className="form-control" type="number" id="quota" value={ethers.formatEther(quota)} disabled={true}></input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row ms-3">
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="residenceId">Residence (block+apt):</label>
                        <div className="input-group input-group-outline">
                          <input className="form-control" type="number" id="residenceId" value={resident.residence} disabled={true}></input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row ms-3">
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="nextPayment">Next Payment:</label>
                        <div className={getNextPaymentClass()}>
                          <input className="form-control" type="text" id="nextPayment" value={getDate(resident.nextPayment)} disabled={true}></input>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row ms-3">
                    <div className="col-md-12 mb-3">
                      {
                        shouldPay()
                          ? (
                            <button className="btn bg-gradient-dark me-2" onClick={btnPayQuotaClick}>
                              <i className="material-icons opacity-10 me-2">save</i>
                              Pay Quota
                            </button>
                          )
                          : <></>
                      }
                      <span className="text-danger">
                        {message}
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
  );
}

export default Quota;
