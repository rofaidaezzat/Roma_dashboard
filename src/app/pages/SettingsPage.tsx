import { useState, useEffect } from "react";
import { Eye, EyeOff, Upload, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { useUpdatePasswordMutation, useUpdateProfileMutation, useGetMeQuery } from "../Redux/Services/authApi";
import { toast } from "sonner";

function InputBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<{ additionalClassNames?: string }>) {
  return (
    <div className={`bg-white relative rounded-[10px] shrink-0 ${additionalClassNames}`}>
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

export function SettingsPage() {
  const { data: meData } = useGetMeQuery();
  const admin = meData?.data;

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    storeName: "",
    storeEmail: "",
    storePhone: "",
    storeAddress: "",
    storeCity: "",
    brandDescription: "",
    instagram: "",
    whatsapp: "",
    facebook: "",
    website: "",
  });

  // Sync form when API data loads
  useEffect(() => {
    if (admin) {
      setFormData((prev) => ({
        ...prev,
        fullName: admin.name || "",
        email: admin.email || "",
        phone: admin.storePhone || "",
        storeName: admin.storeName || "",
        storeEmail: admin.storeEmail || "",
        storePhone: admin.storePhone || "",
        storeAddress: admin.storeAddress || "",
        brandDescription: admin.brandDescription || "",
        instagram: admin.socialLinks?.instagram || "",
        whatsapp: admin.socialLinks?.whatsapp || "",
        facebook: admin.socialLinks?.facebook || "",
        website: admin.socialLinks?.website || "",
      }));
    }
  }, [admin]);

  const [updatePassword, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };



  const handleUpdatePassword = async () => {
    if (!formData.newPassword) {
      toast.error("Please enter a new password.");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (!formData.currentPassword) {
      toast.error("Please provide your current password.");
      return;
    }
    try {
      await updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }).unwrap();

      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      toast.success("Password updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update password. Please check your credentials.");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile({
        name: formData.fullName,
        storeEmail: formData.storeEmail,
        storeName: formData.storeName,
        storePhone: formData.storePhone,
        storeAddress: formData.storeAddress,
        brandDescription: formData.brandDescription,
        socialLinks: {
          facebook: formData.facebook,
          instagram: formData.instagram,
          whatsapp: formData.whatsapp,
          website: formData.website,
        },
      }).unwrap();

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleReset = () => {
    // Reset to default values
    setFormData({
      fullName: admin?.name || "",
      email: admin?.storeEmail || "",
      phone: admin?.storePhone || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      storeName: admin?.storeName || "",
      storeEmail: admin?.storeEmail || "",
      storePhone: admin?.storePhone || "",
      storeAddress: admin?.storeAddress || "",
      storeCity: "",
      brandDescription: admin?.brandDescription || "",
      instagram: admin?.socialLinks?.instagram || "",
      whatsapp: admin?.socialLinks?.whatsapp || "",
      facebook: admin?.socialLinks?.facebook || "",
      website: admin?.socialLinks?.website || "",
    });
  };

  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center p-[14.8px] relative size-full overflow-auto">
      {/* Header */}
      <div className="relative shrink-0 w-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[0.6px] relative size-full">
          <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0">
            <div className="content-stretch flex flex-col items-start pb-[0.6px] relative shrink-0">
              <div className="flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[38px] whitespace-nowrap">
                <p className="leading-[38px]">Settings</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0">
              <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#464646] text-[14px] whitespace-nowrap">
                <p className="leading-[normal]">Manage your profile, store information, and preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="w-full space-y-4">
        {/* Profile Information */}
        <div className="bg-white rounded-[12px] border border-[#f9e5f2] p-6 mb-4">
          <h2 className="text-[18px] font-['Cormorant_Garamond',sans-serif] text-[#141414] mb-4">
            Profile Information
          </h2>

          

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Full Name
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif]"
                />
              </InputBackgroundImage>
            </div>

            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Email Address
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif]"
                />
              </InputBackgroundImage>
            </div>

            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Phone Number
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif]"
                />
              </InputBackgroundImage>
            </div>
          </div>
        </div>

        {/* Password & Security */}
        <div className="bg-white rounded-[12px] border border-[#f9e5f2] p-6 mb-4">
          <h2 className="text-[18px] font-['Cormorant_Garamond',sans-serif] text-[#141414] mb-4">
            Password & Security
          </h2>

          <div className="grid grid-cols-1 gap-4 max-w-[450px]">
            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Current Password
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <div className="relative flex items-center">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                    className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif] pr-10"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 text-[#8e8e8e] hover:text-[#464646] transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </InputBackgroundImage>
            </div>

            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                New Password
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <div className="relative flex items-center">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                    className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif] pr-10"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 text-[#8e8e8e] hover:text-[#464646] transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </InputBackgroundImage>
            </div>

            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Confirm New Password
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <div className="relative flex items-center">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif] pr-10"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 text-[#8e8e8e] hover:text-[#464646] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </InputBackgroundImage>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleUpdatePassword}
              disabled={isUpdatingPassword}
              className="px-5 py-2.5 rounded-[10px] text-[13px] font-['Inter:Regular',sans-serif] font-medium text-[#464646] bg-white border border-[#f4dfee] hover:bg-[#fef5fc] transition-colors disabled:opacity-50"
            >
              {isUpdatingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>

        {/* Store Information */}
        <div className="bg-white rounded-[12px] border border-[#f9e5f2] p-6 mb-4">
          <h2 className="text-[18px] font-['Cormorant_Garamond',sans-serif] text-[#141414] mb-4">
            Store Information
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Store Name
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <input
                  type="text"
                  value={formData.storeName}
                  onChange={(e) => handleInputChange("storeName", e.target.value)}
                  className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif]"
                />
              </InputBackgroundImage>
            </div>

            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Store Email
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <input
                  type="email"
                  value={formData.storeEmail}
                  onChange={(e) => handleInputChange("storeEmail", e.target.value)}
                  className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif]"
                />
              </InputBackgroundImage>
            </div>

            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Store Phone
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <input
                  type="tel"
                  value={formData.storePhone}
                  onChange={(e) => handleInputChange("storePhone", e.target.value)}
                  className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif]"
                />
              </InputBackgroundImage>
            </div>

            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                City / Location
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <input
                  type="text"
                  value={formData.storeCity}
                  onChange={(e) => handleInputChange("storeCity", e.target.value)}
                  className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif]"
                />
              </InputBackgroundImage>
            </div>

            <div className="col-span-2">
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Store Address
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <input
                  type="text"
                  value={formData.storeAddress}
                  onChange={(e) => handleInputChange("storeAddress", e.target.value)}
                  className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif]"
                />
              </InputBackgroundImage>
            </div>

            <div className="col-span-2">
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Brand Description
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <textarea
                  value={formData.brandDescription}
                  onChange={(e) => handleInputChange("brandDescription", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif] resize-none"
                  placeholder="Tell your brand story..."
                />
              </InputBackgroundImage>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-[12px] border border-[#f9e5f2] p-6 mb-6">
          <h2 className="text-[18px] font-['Cormorant_Garamond',sans-serif] text-[#141414] mb-4">
            Social Links
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                Instagram
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange("instagram", e.target.value)}
                  className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif]"
                  placeholder="@username"
                />
              </InputBackgroundImage>
            </div>

            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#464646] mb-2">
                WhatsApp
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                  className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif]"
                  placeholder="+20 100 000 0000"
                />
              </InputBackgroundImage>
            </div>

            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#8e8e8e] mb-2">
                Facebook <span className="text-[10px]">(optional)</span>
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <input
                  type="text"
                  value={formData.facebook}
                  onChange={(e) => handleInputChange("facebook", e.target.value)}
                  className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif]"
                  placeholder="username"
                />
              </InputBackgroundImage>
            </div>

            <div>
              <label className="block text-[12px] font-['Inter:Regular',sans-serif] text-[#8e8e8e] mb-2">
                Website URL <span className="text-[10px]">(optional)</span>
              </label>
              <InputBackgroundImage additionalClassNames="w-full">
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="w-full px-3 py-2.5 bg-transparent border-0 outline-none text-[13px] text-[#464646] font-['Inter:Regular',sans-serif]"
                  placeholder="www.example.com"
                />
              </InputBackgroundImage>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pb-4">
          <button
            onClick={handleReset}
            className="px-5 py-2.5 rounded-[10px] text-[13px] font-['Inter:Regular',sans-serif] font-medium text-[#464646] bg-white border border-[#f4dfee] hover:bg-[#fef5fc] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateProfile}
            disabled={isUpdatingProfile}
            className="px-5 py-2.5 rounded-[10px] text-[13px] font-['Inter:Regular',sans-serif] font-medium text-white bg-[#d52685] hover:bg-[#8e264f] transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            {isUpdatingProfile ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}