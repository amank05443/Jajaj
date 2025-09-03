import React, { lazy } from "react";

const Welcome = lazy(() => import("./Welcome"));
const LoginPage = lazy(() => import("../Authentication/LoginPage"));
const Dashboard = lazy(() => import("./Dashboard"));
const DashboardCards = lazy(() => import("./DashboardCards"));
const E700Page = lazy(() => import("./E700Page"));
const AircraftHeader = lazy(() => import("./AircraftHeader"));

const AutoLogoutHandler = lazy(
  () => import("../Authentication/AutoLogoutHandler"),
);

const CreateProfile = lazy(() => import("../PrepareE700/CreateProfile"));
const Prepare = lazy(() => import("../PrepareE700/Prepare"));
const Modify = lazy(() => import("../PrepareE700/Modify"));
const LeadingParticularTab = lazy(
  () => import("../PrepareE700/LeadingParticularTab"),
);
const RoutineServicingTab = lazy(
  () => import("../PrepareE700/RoutineServicingTab"),
);

const ViewE700 = lazy(() => import("../E700_Report/ViewE700"));

const TestQuals = lazy(() => import("../Section-1/TestQualsSaveAsDraft"));
const ViewLeadingParticulars = lazy(
  () => import("../Section-1/ViewLeadingParticulars"),
);
const ViewLeadingParticular1 = lazy(
  () => import("../Section-1/ViewLeadingParticular"),
);

const OFPLog = lazy(() => import("../Section-2/OFPLog"));
const DemoSaveForm = lazy(() => import("../Section-2/DemoSaveForm"));
const LimitationLog = lazy(() => import("../Section-2/LimitationLog"));
const NewEntryForLimitationLog = lazy(
  () => import("../Section-2/NewEntryForLimitationLog"),
);

const DeferredDefectLog = lazy(() => import("../Section-3/DeferredDefectLog"));
const Concessions = lazy(() => import("../Section-3/Concessions"));
const NewEntryForConcessions = lazy(
  () => import("../Section-3/NewEntryForConcessions"),
);
const NewEntryForDeferredDefectLog = lazy(
  () => import("../Section-3/NewEntryForDeferredDefectLog"),
);
const HusbandryLog = lazy(() => import("../Section-3/HusbandryLog"));
const NewEntryForHusbandryLog = lazy(
  () => import("../Section-3/NewEntryForHusbandryLog"),
);

const PrepareAircraft = lazy(() => import("../Section-4/PrepareAircraft"));
const PilotAcceptance = lazy(() => import("../Section-4/PilotAcceptance"));
const PostFlying = lazy(() => import("../Section-4/PostFlying"));
const FlyingOperations = lazy(() => import("../Section-4/FlyingOperations"));

const NewEntryForUSLog = lazy(() => import("../Section-5/NewEntryForUSLog"));
const USLog = lazy(() => import("../Section-5/USLog"));
const UserList = lazy(() => import("../Section-5/UserList"));

const VariableExpandableLoadItems = lazy(
  () => import("../Section-9/VariableExpandableLoadItems"),
);
const BasicWeightAndMomentsForm = lazy(
  () => import("../Section-9/BasicWeightAndMomentsForm"),
);
const BasicWeightAndMoment = lazy(
  () => import("../Section-9/BasicWeightAndMoment"),
);

export const publicRoutes = [
  { path: "/", element: <Welcome /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/create-profile", element: <CreateProfile /> },
];

export const privateRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dashboardCards", element: <DashboardCards /> },
  { path: "/e700", element: <E700Page /> },
  { path: "/aircraftHeader", element: <AircraftHeader /> },

  { path: "/viewE700", element: <ViewE700 /> },

  { path: "/leadingParticularTab", element: <LeadingParticularTab /> },
  { path: "/prepare", element: <Prepare /> },
  { path: "/modify", element: <Modify /> },
  { path: "/userList", element: <UserList /> },
  { path: "/flying-operations", element: <FlyingOperations /> },

  { path: "/viewLeadingParticulars", element: <ViewLeadingParticular1 /> },

  { path: "/OFPLog", element: <OFPLog /> },
  { path: "/demoSaveForm", element: <DemoSaveForm /> },
  { path: "/limitationLog", element: <LimitationLog /> },
  { path: "/newEntryForLimitationLog", element: <NewEntryForLimitationLog /> },

  { path: "/deferredDefectLog", element: <DeferredDefectLog /> },
  { path: "/husbandryLog", element: <HusbandryLog /> },
  { path: "/concessions", element: <Concessions /> },
  {
    path: "/newEntryForDeferredDefectLog",
    element: <NewEntryForDeferredDefectLog />,
  },
  { path: "/newEntryForHusbandryLog", element: <NewEntryForHusbandryLog /> },
  { path: "/newEntryForConcessions", element: <NewEntryForConcessions /> },

  { path: "/newEntryForUSLog", element: <NewEntryForUSLog /> },
  { path: "/usLog", element: <USLog /> },

  { path: "/routineServicingTab", element: <RoutineServicingTab /> },

  {
    path: "/variableExpandableLoadItems",
    element: <VariableExpandableLoadItems />,
  },
  {
    path: "/basicWeightAndMomentsForm",
    element: <BasicWeightAndMomentsForm />,
  },
  { path: "/basicWeightAndMoment", element: <BasicWeightAndMoment /> },

  { path: "/testQualsForm", element: <TestQuals /> },
];
