import { ContactInfo } from "@/ts/models/user/ContactInfo";
import { ContactClickTypeEnum } from "@/ts/enums/ContactClickTypeEnum";
import { EngagementSourceEnum } from "@/ts/enums/EngagementSourceEnum";
import ContactActionButton from "@/components/cutomized/Contact/ContactActionButton";
import PostContactActions from "./PostContactActions";

type PostMainActionBarProps = {
  instantBooking: boolean;
  isVideoReview: boolean;
  contact: ContactInfo;
  onOpenLinkedProducts: () => void;
  onContactClick: (clickType: ContactClickTypeEnum) => void;
};

const PostMainActionBar = ({
  instantBooking,
  isVideoReview,
  contact,
  onOpenLinkedProducts,
  onContactClick,
}: PostMainActionBarProps) => {
  if (instantBooking) {
    return (
      <ContactActionButton
        instantBooking
        contact={contact}
        onBookNow={onOpenLinkedProducts}
        bookLabel={isVideoReview ? "Rezervă și tu" : "Rezervă acum"}
        userId={null}
        businessId={null}
        source={EngagementSourceEnum.OTHER}
        fullWidth
        size="small"
      />
    );
  }

  return (
    <PostContactActions
      contact={contact}
      onOpenServices={onOpenLinkedProducts}
      onContactClick={onContactClick}
    />
  );
};

export default PostMainActionBar;
