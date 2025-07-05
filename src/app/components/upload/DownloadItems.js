import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export const Pdf = ({href,name}) => {
    return (
        <span className="download-item">
            <div className="download-item-name">
                <img src="/pdf.png" className="download-item-name-icon"></img>
                <p>{name}</p>
            </div>
            <a className="download-icon" href = {href} target="_blank">
                <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
            </a>
        </span>
    )
}

export const Word = ({href,name}) => {
    return (
        <span className="download-item">
            <div className="download-item-name">
                <img src="/word.png" className="download-item-name-icon"></img>
                <p>{name}</p>
            </div>

            <a className="download-icon" href = {href} target="_blank">
                <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
            </a>
        </span>
    )
}

export const Excel = ({href,name}) => {
    return (
        <span className="download-item">
            <div className="download-item-name">
                <img src="/excel.png" className="download-item-name-icon"></img>
                <p>{name}</p>
            </div>
            <a className="download-icon" href = {href} target="_blank">
                <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
            </a>
        </span>
    )
}

