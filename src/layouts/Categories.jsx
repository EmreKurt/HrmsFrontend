import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Icon, Menu, Segment } from "semantic-ui-react";
import CvService from "../services/cvService";
import {
  FaGithub,
  FaLinkedin,
  FaPlusCircle,
  FaTrophy,
  FaUserEdit,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";
import CvNavItem from "./CvNavItem";

import { MdLanguage } from "react-icons/md";

export default function Categories() {
  return (
    <div>
      {/* <div className="d-flex">
        <div
          className="col-2 bg-white min-vh-100"
          style={{ paddingTop: 60, paddingLeft: 20,paddingRight:90 }}
        >
          <div className="d-flex flex-column">
            <span className="navlinkcolor" style={{ fontWeight: "bold",fontSize:18,paddingRight:45 }}>
              Eklediğim Alanlar
            </span>

            <div style={{ fontSize:17,paddingRight:44, paddingTop: 10 }}>
              <CvNavItem text={"Eğitim Bilgileri"} icon={<FaUserGraduate />} />
            </div>

            <div style={{ fontSize:17,paddingRight:130, paddingTop: 10 }}>
              <CvNavItem text={"Dil"} icon={<MdLanguage />} />
            </div>

            <div style={{ fontSize:17,paddingRight:69 , paddingTop: 10}}>
              <CvNavItem text={"Yetenekler"} icon={<FaTrophy />} />
            </div>

            <div style={{ ffontSize:17,paddingRight:74, paddingTop: 10 }}>
              <CvNavItem text={"İş Deneyimi"} icon={<FaUserTie/>} />
            </div>

            <div style={{ fontSize:17,paddingRight:100, paddingTop: 10 }}>
              <CvNavItem text={"Önsöz"} icon={<FaUserEdit />} />
            </div>
          </div>
        </div>
        
      </div> */}
    </div>
  );
}
