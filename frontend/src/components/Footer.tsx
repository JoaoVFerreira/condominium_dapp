export default function Footer() {
  return (
    <footer className="footer py-4  ">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-lg-6 mb-lg-0 mb-4">
            <div className="copyright text-center text-sm text-muted text-lg-start">
              © { new Date().getFullYear() }  - Built by Jhon Ferreira
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <a href="https://www.linkedin.com/in/joaoferreira39/" className="nav-link pe-0 text-muted" target="_blank" rel="noreferrer">About me</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </footer>
  )
}