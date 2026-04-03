import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import TikTokFullMoonPage from "@/pages/TikTokFullMoonPage";
import TKShopWindowPage from "@/pages/TKShopWindowPage";
import TikTokRegisterPage from "@/pages/TikTokRegisterPage";
import VideoCommercePage from "@/pages/VideoCommercePage";
import TKAccountPurchaseFAQ from "@/pages/TKAccountPurchaseFAQ";
import TikTokAccountMarketPage from "@/pages/TikTokAccountMarketPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import CoachingApplicationPage from "@/pages/CoachingApplicationPage";
import CoachingAdminPage from "@/pages/CoachingAdminPage";
import SuccessCasesPage from "@/pages/SuccessCasesPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
// SocialMediaServicesPage 已合并到 TikTokAccountMarketPage
import OpenClawDeploymentGuide from "@/pages/OpenClawDeploymentGuide";
import DeploymentVerification from "@/pages/DeploymentVerification";
import GEOMarketingPage from "@/pages/GEOMarketingPage";
import MetaAccountGuide from "@/pages/MetaAccountGuide";
import NewsPage from "@/pages/NewsPage";
import NewsDetailPage from "@/pages/NewsDetailPage";
import AdminPage from "@/pages/AdminPage";
import AuthProvider, { useAuth } from '@/contexts/authContext';

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tiktok-full-moon" element={<TikTokFullMoonPage />} />
      <Route path="/tk-shop-window" element={<TKShopWindowPage />} />
      <Route path="/tiktok-register" element={<TikTokRegisterPage />} />
      <Route path="/video-commerce" element={<VideoCommercePage />} />
      <Route path="/tk-account-purchase" element={<TKAccountPurchaseFAQ />} />
      <Route path="/tiktok-market" element={<TikTokAccountMarketPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/coaching-application" element={<CoachingApplicationPage />} />
      <Route path="/coaching-admin" element={<CoachingAdminPage />} />
      <Route path="/success-cases" element={<SuccessCasesPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/social-media-services" element={<Navigate to="/tiktok-market" replace />} />
      <Route path="/deployment-guide" element={<OpenClawDeploymentGuide />} />
      <Route path="/deployment-verification" element={<DeploymentVerification />} />
      <Route path="/geo-marketing" element={<GEOMarketingPage />} />
      <Route path="/meta-account-guide" element={<MetaAccountGuide />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:id" element={<NewsDetailPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
