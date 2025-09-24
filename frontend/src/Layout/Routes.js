import React, { lazy } from "react";

//---LAYOUT---//
const Welcome = lazy(() => import("./Welcome"));
const LoginPage = lazy(() => import("../Authentication/LoginPage"));
const Dashboard = lazy(() => import("./Dashboard"));
const DashboardCards = lazy(() => import("./DashboardCards"));
const E700Page = lazy(() => import("./E700Page"));
const AircraftHeader = lazy(() => import("./AircraftHeader"));

//--AUTHENTICATION--//
const AutoLogoutHandler = lazy(
  () => import("../Authentication/AutoLogoutHandler"),
);

//--PREPARE E700--//
const CreateProfile = lazy(() => import("../PrepareE700/CreateProfile"));
const Prepare = lazy(() => import("../PrepareE700/Prepare"));
const Modify = lazy(() => import("../PrepareE700/Modify"));
const LeadingParticularTab = lazy(
  () => import("../PrepareE700/LeadingParticularTab"),
);


//--REPORT E700--//
const ViewE700 = lazy(() => import("../E700_Report/ViewE700"));

//--SECTION->1--//
const TestQuals = lazy(() => import("../Section-1/TestQualsSaveAsDraft"));
const ViewLeadingParticulars = lazy(
  () => import("../Section-1/ViewLeadingParticulars"),
);

//--SECTION->2--//
const OFPLog = lazy(() => import("../Section-2/OFPLog"));
const DemoSaveForm = lazy(() => import("../Section-2/DemoSaveForm"));
const LimitationLog = lazy(() => import("../Section-2/LimitationLog"));
const NewEntryForLimitationLog = lazy(
  () => import("../Section-2/NewEntryForLimitationLog"),
);

//--SECTION->3--//
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

//--SECTION->4--//
const PrepareAircraft = lazy(() => import("../Section-4/PrepareAircraft"));
const PilotAcceptance = lazy(() => import("../Section-4/PilotAcceptance"));
const PostFlying = lazy(() => import("../Section-4/PostFlying"));
const FlyingOperations = lazy(() => import("../Section-4/FlyingOperations"));

//--SECTION->5--//
const NewEntryForUSLog = lazy(() => import("../Section-5/NewEntryForUSLog"));
const USLog = lazy(() => import("../Section-5/USLog"));
const USLog2 = lazy(() => import("../Section-5/USLog2"));
const UserList = lazy(() => import("../Section-5/UserList"));

//--SECTION->7--//
const RoutineServicingTab = lazy(
  () => import("../Section-7/RoutineServicingTab"),
);
//--SECTION->9--//
const VariableExpandableLoadItems = lazy(
  () => import("../Section-9/VariableExpandableLoadItems"),
);
const BasicWeightAndMomentsForm = lazy(
  () => import("../Section-9/BasicWeightAndMomentsForm"),
);
const BasicWeightAndMoment = lazy(
  () => import("../Section-9/BasicWeightAndMoment"),
);

//--SECTION-> 10--//
const CompassLog = lazy(
  () => import("../Section-10/CompassLog"),
);
const CompassLogView = lazy(
  () => import("../Section-10/CompassLogView"),
);

//-------------------------------------------------------------------------ROUTES-----------------------------------------------------------------------------------//

//--------------PUBLIC ROUTES------------(Accessible even without Login)//
export const publicRoutes = [
  { path: "/", element: <Welcome /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/create-profile", element: <CreateProfile /> },
];

//-----------------PRIVATE ROUTES----------(Accessible only for Successfully Logged in)//
export const privateRoutes = [
  //---LAYOUT---//
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/dashboardCards", element: <DashboardCards /> },
  { path: "/e700", element: <E700Page /> },
  { path: "/aircraftHeader", element: <AircraftHeader /> },

  //--REPORT E700--//
  { path: "/viewE700", element: <ViewE700 /> },

  { path: "/leadingParticularTab", element: <LeadingParticularTab /> },
  { path: "/prepare", element: <Prepare /> },
  { path: "/modify", element: <Modify /> },
  { path: "/flying-operations", element: <FlyingOperations /> },

  //--SECTION-> 1--//
  { path: "/viewLeadingParticulars", element: <ViewLeadingParticulars /> },

  //--SECTION-> 2--//
  { path: "/OFPLog", element: <OFPLog /> },
  { path: "/demoSaveForm", element: <DemoSaveForm /> },
  { path: "/limitationLog", element: <LimitationLog /> },
  { path: "/newEntryForLimitationLog", element: <NewEntryForLimitationLog /> },

  //--SECTION-> 3--//
  { path: "/deferredDefectLog", element: <DeferredDefectLog /> },
  { path: "/husbandryLog", element: <HusbandryLog /> },
  { path: "/concessions", element: <Concessions /> },
  {
    path: "/newEntryForDeferredDefectLog",
    element: <NewEntryForDeferredDefectLog />,
  },
  { path: "/newEntryForHusbandryLog", element: <NewEntryForHusbandryLog /> },
  { path: "/newEntryForConcessions", element: <NewEntryForConcessions /> },

  //--SECTION-> 5--//
  { path: "/newEntryForUSLog", element: <NewEntryForUSLog /> },
  { path: "/userList", element: <UserList /> },
  { path: "/usLog", element: <USLog /> },
   { path: "/usLog2", element: <USLog2 /> },

  //--SECTION-> 7--//
  { path: "/routineServicingTab", element: <RoutineServicingTab /> },

  //--SECTION-> 9--//
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

  //--SECTION-> 10--//
  {
    path: "/compassLog",
    element: <CompassLog />,
  },
  {
    path: "/compassLogView",
    element: <CompassLogView />,
  },
];
