import { ContactInfo } from "@/ts/models/user/ContactInfo";
import ContactActionButton from "@/components/cutomized/Contact/ContactActionButton";
import PostContactActions from "./PostContactActions";

type PostMainActionBarProps = {
  instantBooking: boolean;
  isVideoReview: boolean;
  contact: ContactInfo;
  onOpenLinkedProducts: () => void;
};

const PostMainActionBar = ({
  instantBooking,
  isVideoReview,
  contact,
  onOpenLinkedProducts,
}: PostMainActionBarProps) => {
  if (instantBooking) {
    return (
      <ContactActionButton
        instantBooking
        contact={contact}
        onBookNow={onOpenLinkedProducts}
        bookLabel={isVideoReview ? "Rezervă și tu" : "Rezervă acum"}
        fullWidth
        size="small"
      />
    );
  }

  return (
    <PostContactActions contact={contact} onOpenServices={onOpenLinkedProducts} />
  );
};

export default PostMainActionBar;
