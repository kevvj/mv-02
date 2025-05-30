import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export const Pdf = () => {
    return (
        <span className="download-item">
            <div className="download-item-name">
                <img src="/pdf.png" className="download-item-name"></img>
                nombre
            </div>
            <div className="download-icon">
                <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
            </div>
        </span>
    )
}

export const Word = () => {
    return (
        <span className="download-item">
            <div className="download-item-name">
                <img src="/word.png" className="download-item-name"></img>
                nombre
            </div>

            <div className="download-icon">
                <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
            </div>
        </span>
    )
}

export const Excel = () => {
    return (
        <span className="download-item">
            <div className="download-item-name">
                <img src="/excel.png" className="download-item-name"></img>
                nombre
            </div>
            <div className="download-icon">
                <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
            </div>
        </span>
    )
}

