<div className="flex flex-col md:flex-row ">
  {/* Left: Description */}
  <div className="md:w-[60%] w-full p-12 text-[#595959] bg-white">
    <h1 className="text-2xl font-bold mb-2">Description</h1>
    <p>{listingData.description}</p>
  </div>

  {/* Right: Contact Agent */}
  <div className="md:w-[40%] w-full p-8 bg-red-200">
    {/* {listingData.seller} */}
    {/* Contact agent: {JSON.parse(listingData.seller).username}
  Email: {JSON.parse(listingData.seller).email} */}
  </div>
</div>;
