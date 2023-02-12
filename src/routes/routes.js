import { Routes, Route, Navigate } from "react-router-dom";
import CompaniesAdd from "../pages/Companies/CompaniesAdd";
import CompaniesList from "../pages/Companies/CompaniesList";
import CompanyIdPage from "../pages/Companies/CompanyIdPage";
import ConversationIdPage from "../pages/Conversations/ConversationIdPage";
import ConversationsList from "../pages/Conversations/ConversationsList";
import CounterpartiesAdd from "../pages/Counterparties/CounterpartiesAdd";
import DocumentAdd from "../pages/Documents/DocumentAdd";
import DocumentIdPage from "../pages/Documents/DocumentIdPage";
import DocumentsList from "../pages/Documents/DocumentsList";
import Login from "../pages/Login/Login";
import PropertyIdPage from "../pages/Property/PropertyIdPage";
import PropertyList from "../pages/Property/PropertyList";
import RecipientsAdd from "../pages/Recipients/RecipientsAdd";
import RecipientsIdPage from "../pages/Recipients/RecipientsIdPage";
import RecipientsList from "../pages/Recipients/RecipientsList";
import Registration from "../pages/Registration/Registration";
import ClientIdPage from "../pages/Counterparties/ClientIdPage";
import EntityIdPage from "../pages/Counterparties/EntityIdPage";
import ConversationsAdd from "../pages/Conversations/ConversationsAdd";
import PropertyAdd from "../pages/Property/PropertyAdd";
import CounterpartiesList from "../pages/Counterparties/CounterpartiesList";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/documents/add" element={<DocumentAdd />} />
      <Route path="/documents" element={<DocumentsList />} />
      <Route path="/documents/:id" element={<DocumentIdPage />} />
      <Route path="/companies/add" element={<CompaniesAdd />} />
      <Route path="/companies" element={<CompaniesList />} />
      <Route path="/companies/:id" element={<CompanyIdPage />} />
      <Route path="/recipients/add" element={<RecipientsAdd />} />
      <Route path="/recipients" element={<RecipientsList />} />
      <Route path="/recipients/:id" element={<RecipientsIdPage />} />
      <Route path="/conversations/add" element={<ConversationsAdd />} />
      <Route path="/conversations" element={<ConversationsList />} />
      <Route path="/conversations/:id" element={<ConversationIdPage />} />
      <Route path="/properties/add" element={<PropertyAdd />} />
      <Route path="/properties" element={<PropertyList />} />
      <Route path="/properties/:id" element={<PropertyIdPage />} />
      <Route path="/counterparties/add" element={<CounterpartiesAdd />} />
      <Route path="/counterparties" element={<CounterpartiesList />} />
      <Route path="/counterparties/client/:id" element={<ClientIdPage />} />
      <Route path="/counterparties/entity/:id" element={<EntityIdPage />} />
      <Route path="*" element={<Navigate to="/documents" replace />} />
    </Routes>
  );
};

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
