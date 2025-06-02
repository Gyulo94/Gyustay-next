import { getMe } from "@/actions/user.actions";
import UserInfoForm from "@/components/user/user-info-form";
import { UserType } from "@/type/user.type";

export default async function UserEditPage() {
  const user: UserType = await getMe();

  return (
    <div className="mt-10 max-w-3xl h-[77vh] md:h-[80vh] mx-auto px-4 md:pt-15">
      <h1 className="text-3xl font-semibold">유저 정보 변경</h1>
      <div className="mt-10 mb-28">
        <UserInfoForm user={user} />
      </div>
    </div>
  );
}
