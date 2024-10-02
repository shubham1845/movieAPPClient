import Banner from "../components/Banner";

export default function Home() {
  const data = {
    title: "Movie App",
    content: "Watch your Movies ",
    destination: "/",
    buttonLabel: "Watch now!",
  };

  return (
    <>
      <Banner data={data} />
      {/* <FeaturedProducts /> */}
      {/* <Highlights /> */}
    </>
  );
}
