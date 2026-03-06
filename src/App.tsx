import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import type { RootState } from "@/store";
import {
  login as loginAction,
  logout as logoutAction,
} from "@/store/slices/authSlice";
import { Header } from "@/components/layout";
import { ErrorBoundary } from "@/components/common";

const CasePage = lazy(() =>
  import("@/pages/home/CasePage").then((m) => ({ default: m.CasePage })),
);
const WorksPage = lazy(() =>
  import("@/pages/home/WorksPage").then((m) => ({ default: m.WorksPage })),
);
const PersonalAssetsPage = lazy(() =>
  import("@/pages/home/PersonalAssetsPage").then((m) => ({
    default: m.PersonalAssetsPage,
  })),
);
const ProjectsPage = lazy(() =>
  import("@/pages/user/ProjectsPage").then((m) => ({
    default: m.ProjectsPage,
  })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/user/NotFoundPage").then((m) => ({
    default: m.NotFoundPage,
  })),
);
const GlobalSettingsPage = lazy(() =>
  import("@/pages/creation/GlobalSettingsPage").then((m) => ({
    default: m.GlobalSettingsPage,
  })),
);
const StoryPlotPage = lazy(() =>
  import("@/pages/creation/StoryPlotPage").then((m) => ({
    default: m.StoryPlotPage,
  })),
);
const SceneCharacterPropsPage = lazy(() =>
  import("@/pages/creation/SceneCharacterPropsPage").then((m) => ({
    default: m.SceneCharacterPropsPage,
  })),
);
const StoryboardPage = lazy(() =>
  import("@/pages/creation/StoryboardPage").then((m) => ({
    default: m.StoryboardPage,
  })),
);
const StoryboardVideoPage = lazy(() =>
  import("@/pages/creation/StoryboardVideoPage").then((m) => ({
    default: m.StoryboardVideoPage,
  })),
);
const DubbingPage = lazy(() =>
  import("@/pages/creation/DubbingPage").then((m) => ({
    default: m.DubbingPage,
  })),
);
const VideoPreviewPage = lazy(() =>
  import("@/pages/creation/VideoPreviewPage").then((m) => ({
    default: m.VideoPreviewPage,
  })),
);

const PATH_TO_STEP: Record<string, number> = {
  "/global-settings": 0,
  "/story-plot": 1,
  "/scene-character-props": 2,
  "/storyboard": 3,
  "/storyboard-video": 4,
  "/dubbing": 5,
  "/video-preview": 6,
};

const SHOW_HEADER_PATHS = [
  "/case",
  "/works",
  "/personal-assets",
  "/projects",
  "/",
];

function PageLoader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        minHeight: "400px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div className="loading-spinner" />
        <p style={{ color: "#666", marginTop: "16px" }}>加载中...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );

  const getActiveStep = () => {
    return PATH_TO_STEP[location.pathname] ?? 0;
  };

  const shouldShowHeader = SHOW_HEADER_PATHS.includes(location.pathname);

  const handleLogin = () => {
    dispatch(loginAction({ userId: Date.now(), username: "用户" }));
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="app">
      {shouldShowHeader && (
        <Header
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      )}

      <MainLayout activeStep={getActiveStep()}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/case" replace />} />
            <Route path="/case" element={<CasePage />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/personal-assets" element={<PersonalAssetsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/global-settings" element={<GlobalSettingsPage />} />
            <Route path="/story-plot" element={<StoryPlotPage />} />
            <Route
              path="/scene-character-props"
              element={<SceneCharacterPropsPage />}
            />
            <Route path="/storyboard" element={<StoryboardPage />} />
            <Route path="/storyboard-video" element={<StoryboardVideoPage />} />
            <Route path="/dubbing" element={<DubbingPage />} />
            <Route path="/video-preview" element={<VideoPreviewPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </MainLayout>

      {isLoggedIn && <Footer />}
      <Toast />
      <PageLoading />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
