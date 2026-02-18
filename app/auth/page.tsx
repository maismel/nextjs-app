'use client';

import AuthTabs from "@/features/auth/components/AuthTabs";
import { apolloClient } from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client/react";

export default function Page() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthTabs />
    </ApolloProvider>
  );
}
