import { LinearProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const SignIn = lazy(() => import("../Auth/SignIn"));
const SignInWithEmailLink = lazy(() => import("../Auth/SignInWithEmail"));
const ProductList = lazy(() => import("../Product/ListView/ProductList"));
const ProductDetail = lazy(() => import("../Product/DetailView/ProductDetail"));
const FabricDetail = lazy(() => import("../Fabric/DetailView/FabricDetail"));
const StyleDetail = lazy(() => import("../Style/DetailView/StyleDetail"));
const StyleList = lazy(() => import("../Style/ListView/StyleList"));
const UserList = lazy(() => import("../User/ListView/UserList"));
const PurchaseOrderList = lazy(
  () => import("../PurchaseOrder/ListView/PurchaseOrderList")
);
const PurchaseOrderDetail = lazy(
  () => import("../PurchaseOrder/DetailView/PurchaseOrderDetail")
);
const FabricList = lazy(() => import("../Fabric/ListView/FabricList"));
const FactoryList = lazy(() => import("../Factory/ListView/FactoryList"));
const AppBar = lazy(() => import("./AppBar"));
const RequireAuth = lazy(() => import("../Auth/RequireAuth"));

export default function AppRouter() {
  const loadingFallback = <LinearProgress />;
  return (
    <Router>
      <Suspense fallback={loadingFallback}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/singinwithemaillink"
            element={<SignInWithEmailLink />}
          />
          <Route
            path="/"
            element={
              <RequireAuth>
                <AppBar />
                <ProductList />
              </RequireAuth>
            }
          />
          <Route
            path="/products"
            element={
              <RequireAuth>
                <AppBar />
                <ProductList />
              </RequireAuth>
            }
          />
          <Route
            path="/products/:code"
            element={
              <RequireAuth>
                <AppBar />
                <ProductDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/fabrics"
            element={
              <RequireAuth>
                <AppBar />
                <FabricList />
              </RequireAuth>
            }
          />
          <Route
            path="/fabrics/:code"
            element={
              <RequireAuth>
                <AppBar />
                <FabricDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/styles"
            element={
              <RequireAuth>
                <AppBar />
                <StyleList />
              </RequireAuth>
            }
          />
          <Route
            path="/styles/:code"
            element={
              <RequireAuth>
                <AppBar />
                <StyleDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth>
                <AppBar />
                <UserList />
              </RequireAuth>
            }
          />
          <Route
            path="/factories"
            element={
              <RequireAuth>
                <AppBar />
                <FactoryList />
              </RequireAuth>
            }
          />
          <Route
            path="/purchase-orders"
            element={
              <RequireAuth>
                <AppBar />
                <PurchaseOrderList />
              </RequireAuth>
            }
          />
          <Route
            path="/purchase-orders/:uid"
            element={
              <RequireAuth>
                <AppBar />
                <PurchaseOrderDetail />
              </RequireAuth>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}
