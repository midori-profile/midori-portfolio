import { auth } from "app/auth";
import { getGuestbookEntries } from "app/db/queries";
import { SignIn, SignOut } from "./buttons";
import { Suspense } from "react";
import Form from "./form";
import { Loading } from "app/components/loading";

export const metadata = {
  title: "Guestbook",
  description: "Sign my guestbook and leave your mark.",
};

export default function GuestbookPage() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        Sign in my guestbook
      </h1>
      <Suspense fallback={<Loading/>}>
        <GuestbookForm />
        <GuestbookEntries />
      </Suspense>
    </section>
  );
}

async function GuestbookForm() {
  let session = await auth();

  return session?.user ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
}

async function GuestbookEntries() {
  let entries = await getGuestbookEntries();

  if (entries.length === 0) {
    return null;
  }

  return entries.map((entry) => (
    <div key={entry.id} className="flex flex-col space-y-1 mb-4">
      <div className="w-full text-sm break-words">
        <span className="text-neutral-600 mr-1">
          {entry.created_by}:
        </span>
        {entry.body}
      </div>
    </div>
  ));
}
