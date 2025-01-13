import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { publicRouters, doctorRouters, adminRouters , patientRouters } from './Path';
import { DoctorRouters, AdminRouters , PatientRouters} from './CheckRouters';
import { Fragment } from "react";


const Routers = () => {
  return (
    <Routes>
      {publicRouters.map((route, index) => {
        const Layout = route.layout || Fragment;
        const Page = route.component;
        return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />;
      })}

      <Route element={<PatientRouters />}>
        {patientRouters.map((route, index) => {
          const Layout = route.layout || Fragment;
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Layout isForPatient={true}><Page /></Layout>} />;
        })}
      </Route>


      <Route element={<DoctorRouters />}>
        {doctorRouters.map((route, index) => {
          const Layout = route.layout || Fragment;
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />;
        })}
      </Route>

      <Route element={<AdminRouters />}>
        {adminRouters.map((route, index) => {
          const Layout = route.layout || Fragment;
          const Page = route.component;
          return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />;
        })}
      </Route>

    </Routes>
  )
}

export default Routers