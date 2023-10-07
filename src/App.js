import React from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainLayout from "./Component/Layout/MainLayout";
import AddClaimRelease from "./Pages/AddClaimRelease";
import Analytics from "./Pages/Analytics";
import ArtistChannelRequest from "./Pages/ArtistChannelRequest";
import AudioSubmission from "./Pages/AudioSubmission";
import CallerTune from "./Pages/CallerTune";
import CatalogDetails from "./Pages/CatalogDetails";
import ContentIdRequest from "./Pages/ContentIdRequest";
import Dashboard from "./Pages/Dashboard";
import EditPrimaryArtist from "./Pages/EditPrimaryArtist";
import ForgetPassword from "./Pages/ForgetPassword";
import LabelManage from "./Pages/LabelManage";
import LogIn from "./Pages/LogIn";
import ManualClaimRequest from "./Pages/ManualClaimRequest";
import Overview from "./Pages/Overview";
import PrimaryArtistManage from "./Pages/PrimaryArtistManage";
import Profile from "./Pages/Profile";
import ReleaseAudio from "./Pages/ReleaseAudio";
import ReleaseAudioEdit from "./Pages/ReleaseAudioEdit";
import ReleaseCatalogs from "./Pages/ReleaseCatalogs";
import SupportCenter from "./Pages/SupportCenter";
import Withdraw from "./Pages/Withdraw";
import { store } from "./store";

function App() {
  if (window.location.pathname == "/" && localStorage.getItem("accessToken")) {
    window.location.href = "/dashboard";
  }

  if (window.location.pathname != "/" && !localStorage.getItem("accessToken")) {
    window.location.href = "/";
  }

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/" element={<MainLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="release-audio" element={<ReleaseAudio />} />
              <Route path="release-audio/:id" element={<ReleaseAudioEdit />} />
              <Route path="all-release" element={<ReleaseCatalogs />} />
              <Route path="analytics" element={<Analytics />} />
              <Route
                path="primary_artist_manage"
                element={<PrimaryArtistManage />}
              />
              <Route path="add_claim_release" element={<AddClaimRelease />} />
              <Route path="content_id_request" element={<ContentIdRequest />} />
              <Route
                path="artist_channel_request"
                element={<ArtistChannelRequest />}
              />
              <Route
                path="manual_laim_request"
                element={<ManualClaimRequest />}
              />
              <Route path="overview" element={<Overview />} />
              <Route path="withdraw" element={<Withdraw />} />
              <Route path="audio_submission" element={<AudioSubmission />} />
              <Route
                path="edit_primary_artist"
                element={<EditPrimaryArtist />}
              />
              <Route path="catalog_details/:id" element={<CatalogDetails />} />
              <Route path="support_center" element={<SupportCenter />} />
              <Route path="label_manage" element={<LabelManage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="caller_tune" element={<CallerTune />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
