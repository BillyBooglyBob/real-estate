import { useSelector } from "react-redux";

export const ViewListings = () => {
  /* Get all the listings of the user currently signed in
get the email first, get the user with that email, get the listings with the user 
store list of listings.

Display the listings, each with a link to the relevant listing page
Delete button to remove the listing
*/

  const user = useSelector((state) => state.user.currentUser);
  console.log(user);

  // useEffect(() => {

  // }, []);

  return (
    <>
      <div>viewListings</div>
    </>
  );
};
