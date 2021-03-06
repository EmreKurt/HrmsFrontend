import React from 'react'
import { FaEdit, FaUserGraduate } from 'react-icons/fa'

function SchoolItem({schoolName,onEditClick,department,entryDate,graduationDate}) {
    return (
        <div className="d-flex align-items-center" style={{marginTop:20,paddingBottom:25}}>
            <div style={{paddingLeft:40,paddingTop:20}}>
                <FaUserGraduate size={70} color={"#840eb6"}/>
            </div>
            <div className="d-flex">
                {/* <div className="d-flex flex-column" style={{width:300,marginLeft:80}}>
                <div className="d-flex flex-column">
                    <span className="navlinkcolor">Okul Adı</span>
                    <span>{schoolName}</span>
                </div>
                <div className="d-flex flex-column">
                    <span className="navlinkcolor">Departman</span>
                    <span>{department}</span>
                </div>
                </div>
                <div className="d-flex flex-column" style={{marginLeft:60}}>
                <div className="d-flex flex-column">
                    <span className="navlinkcolor">Başlangıç Tarihi</span>
                    <span>{entryDate}</span>
                </div>
                <div className="d-flex flex-column">
                    <span className="navlinkcolor">Mezuniyet Durumu</span>
                    <span>Devam Ediyor</span>
                </div>
                </div>*/}

              
                
            </div> 
        </div>
    )
}

export default SchoolItem