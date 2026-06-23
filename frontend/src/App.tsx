import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import WhyNowPage from "./pages/WhyNowPage";
import DiscoveryPage from "./pages/DiscoveryPage";
import TalkTracksPage from "./pages/TalkTracksPage";
import ObjectionsPage from "./pages/ObjectionsPage";
import MessagingPage from "./pages/MessagingPage";
import ProofPage from "./pages/ProofPage";
import AccountPrepPage from "./pages/AccountPrepPage";
import AccountPilotPage from "./pages/AccountPilotPage";
import CustomerTeeUpPage from "./pages/CustomerTeeUpPage";
import EditorPage from "./pages/EditorPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/:accountId" element={<AccountPrepPage />} />
        <Route path="/account/:accountId/pilot" element={<AccountPilotPage />} />
        <Route path="/messaging" element={<MessagingPage />} />
        <Route path="/tee-up" element={<CustomerTeeUpPage />} />
        <Route path="/proof" element={<ProofPage />} />
        <Route path="/why-now" element={<WhyNowPage />} />
        <Route path="/discovery" element={<DiscoveryPage />} />
        <Route path="/talk-tracks" element={<TalkTracksPage />} />
        <Route path="/objections" element={<ObjectionsPage />} />
        <Route path="/editor" element={<EditorPage />} />
      </Routes>
    </Layout>
  );
}
