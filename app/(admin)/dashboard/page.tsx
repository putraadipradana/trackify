export default async function Page() {
  return (
    <div>
      <PageHeader />
      {/* <CardSection />
      <div className="mt-14">
        <h2 className="text-base/7 sm:text-sm/6 font-semibold">
          Recent orders
        </h2>
      </div> */}
    </div>
  );
}

function PageHeader() {
  return (
    <div>
      <h1 className="text-2xl/8 font-semibold sm:text-xl/8">
        Good morning, Motherfucker
      </h1>
    </div>
  );
}
