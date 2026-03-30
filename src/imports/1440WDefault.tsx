import clsx from "clsx";
import svgPaths from "./svg-ynxqjjqcen";
import imgAvatar from "figma:asset/e7818b65f0d8b0d520497ad115745a9146791c2c.png";
type InputBackgroundImageProps = {
  additionalClassNames?: string;
};

function InputBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<InputBackgroundImageProps>) {
  return (
    <div className={clsx("bg-white relative rounded-[10px] shrink-0", additionalClassNames)}>
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center size-full">
      <div className="content-stretch flex items-center px-[12.8px] py-[10.8px] relative w-full">{children}</div>
    </div>
  );
}
type ContainerBackgroundImageAndTextProps = {
  text: string;
};

function ContainerBackgroundImageAndText({ text }: ContainerBackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#464646] text-[16px] whitespace-nowrap">
        <p className="leading-[normal]">{text}</p>
      </div>
    </div>
  );
}
type CellBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function CellBackgroundImageAndText({ text, additionalClassNames = "" }: CellBackgroundImageAndTextProps) {
  return (
    <div className={clsx("content-stretch flex flex-col items-start pb-[12.9px] pt-[12.5px] relative shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-[#f9e5f2] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#464646] text-[11px] tracking-[0.44px] uppercase whitespace-nowrap">
        <p className="leading-[normal]">{text}</p>
      </div>
    </div>
  );
}
type LinkBackgroundImageAndTextProps = {
  text: string;
};

function LinkBackgroundImageAndText({ text }: LinkBackgroundImageAndTextProps) {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <BackgroundImage>
        <div className="flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#464646] text-[14px] whitespace-nowrap">
          <p className="leading-[normal]">{text}</p>
        </div>
      </BackgroundImage>
    </div>
  );
}

export default function Component1440WDefault() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="1440w default" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1440 900\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(115.26 0 0 115.26 720 900)\\'><stop stop-color=\\'rgba(230,217,225,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(216,213,218,1)\\' offset=\\'0.62\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="h-[900px] min-h-[900px] relative shrink-0 w-full" data-name="Container">
        <div className="flex flex-row justify-center min-h-[inherit] size-full">
          <div className="content-stretch flex gap-[16px] items-start justify-center min-h-[inherit] p-[16px] relative size-full">
            <div className="bg-[#faf5f5] relative rounded-[20px] self-stretch shrink-0 w-[250px]" data-name="Aside">
              <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[20px]" />
              <div className="content-stretch flex flex-col items-start px-[18.8px] py-[24.8px] relative size-full">
                <div className="relative shrink-0 w-full" data-name="Margin">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[16px] relative w-full">
                    <div className="h-[48.8px] relative shrink-0 w-full" data-name="HorizontalBorder">
                      <div aria-hidden="true" className="absolute border-[#f4dfee] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
                      <div className="-translate-y-1/2 absolute flex flex-col font-['Cormorant_Garamond:Light',sans-serif] h-[34px] justify-center leading-[0] left-0 not-italic text-[#141414] text-[34px] top-[16.4px] w-[122.629px]">
                        <p className="leading-[34px]">By Rom</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-[1_0_0] min-h-[236px] min-w-px relative w-full" data-name="List:margin">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start min-h-[inherit] pb-[485.6px] relative size-full">
                    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="List">
                      <div className="content-stretch flex flex-col h-[40.8px] items-start relative shrink-0 w-full" data-name="Item">
                        <LinkBackgroundImageAndText text="Overview" />
                      </div>
                      <div className="content-stretch flex flex-col h-[40.8px] items-start relative shrink-0 w-full" data-name="Item">
                        <div className="relative rounded-[10px] shrink-0 w-full" data-name="Link" style={{ backgroundImage: "linear-gradient(109.498deg, rgb(253, 238, 247) 0%, rgb(251, 229, 241) 100%)" }}>
                          <div aria-hidden="true" className="absolute border border-[#f4cde4] border-solid inset-0 pointer-events-none rounded-[10px]" />
                          <BackgroundImage>
                            <div className="flex flex-col font-['Manrope:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#d52685] text-[14px] whitespace-nowrap">
                              <p className="leading-[normal]">Orders</p>
                            </div>
                          </BackgroundImage>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col h-[40.8px] items-start relative shrink-0 w-full" data-name="Item">
                        <LinkBackgroundImageAndText text="Products" />
                      </div>
                      <div className="content-stretch flex flex-col h-[40.8px] items-start relative shrink-0 w-full" data-name="Item">
                        <LinkBackgroundImageAndText text="Customers" />
                      </div>
                      <div className="content-stretch flex flex-col h-[40.8px] items-start relative shrink-0 w-full" data-name="Item">
                        <LinkBackgroundImageAndText text="Settings" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0" data-name="Button">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center pb-[8.8px] pl-[10px] pr-[157.25px] pt-[8px] relative">
                    <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#8e264f] text-[13.1px] whitespace-nowrap">
                      <p className="leading-[normal]">Logout</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#faf5f5] relative rounded-[20px] self-stretch shrink-0 w-[1142px]" data-name="Main">
              <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[20px]" />
              <div className="flex flex-col justify-center size-full">
                <div className="content-stretch flex flex-col gap-[12px] items-start justify-center pb-[522.4px] pt-[16.8px] px-[16.8px] relative size-full">
                  <div className="bg-[#fffafd] h-[59.2px] relative rounded-[14px] shrink-0 w-full" data-name="Section">
                    <div aria-hidden="true" className="absolute border border-[#f2f2f2] border-solid inset-0 pointer-events-none rounded-[14px]" />
                    <div className="flex flex-row items-center size-full">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between p-[10.8px] relative size-full">
                        <div className="flex-[1_0_0] max-w-[460px] min-h-px min-w-px relative" data-name="Label">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-w-[inherit] relative w-full">
                            <InputBackgroundImage additionalClassNames="h-[37.6px] w-full">
                              <div className="absolute content-stretch flex flex-col items-start left-[34.8px] overflow-clip pb-[0.8px] right-[26.4px] top-[10.8px]" data-name="Container">
                                <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#757575] text-[12.6px] whitespace-nowrap">
                                  <p className="leading-[normal]">Search entire dashboard...</p>
                                </div>
                              </div>
                              <div className="absolute content-stretch flex items-center left-[34.8px] right-[12.8px] top-[10.8px]" data-name="Container">
                                <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px" data-name="Container" />
                                <div className="h-[9.6px] shrink-0 w-[13.6px]" data-name="Margin" />
                              </div>
                            </InputBackgroundImage>
                            <div className="absolute bottom-[28.72%] left-[10px] overflow-clip top-[28.72%] w-[16px]" data-name="SVG">
                              <div className="absolute inset-[20.83%_29.17%_29.17%_20.83%]" data-name="Vector">
                                <div className="absolute inset-[-7.5%]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.2 9.2">
                                    <path d={svgPaths.p3d77900} id="Vector" stroke="var(--stroke-0, #464646)" strokeWidth="1.2" />
                                  </svg>
                                </div>
                              </div>
                              <div className="absolute inset-[66.67%_12.5%_12.5%_66.67%]" data-name="Vector">
                                <div className="absolute inset-[-12.73%]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.18186 4.18186">
                                    <path d={svgPaths.p3bfeb00} id="Vector" stroke="var(--stroke-0, #464646)" strokeWidth="1.2" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative shrink-0" data-name="Container">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-start relative">
                            <div className="bg-white content-stretch flex flex-col items-center justify-center pb-[9.6px] pt-[11.2px] px-px relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
                              <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[10px]" />
                              <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13.3px] text-black text-center whitespace-nowrap">
                                <p className="leading-[normal]">🔔</p>
                              </div>
                            </div>
                            <div className="pointer-events-none relative rounded-[18px] shrink-0 size-[36px]" data-name="avatar">
                              <div className="absolute inset-0 overflow-hidden rounded-[18px]">
                                <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-25%] w-full" src={imgAvatar} />
                              </div>
                              <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 rounded-[18px]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#fffafd] h-[257.6px] relative rounded-[14px] shrink-0 w-full" data-name="Section">
                    <div aria-hidden="true" className="absolute border border-[#f2f2f2] border-solid inset-0 pointer-events-none rounded-[14px]" />
                    <div className="flex flex-col justify-center size-full">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start justify-center p-[14.8px] relative size-full">
                        <div className="h-[62.2px] relative shrink-0 w-full" data-name="Header">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[0.6px] relative size-full">
                            <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0 w-[319px]" data-name="Container">
                              <div className="content-stretch flex flex-col items-start pb-[0.6px] relative shrink-0 w-full" data-name="Heading 1">
                                <div className="flex flex-col font-['Cormorant_Garamond:Light',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#141414] text-[38px] whitespace-nowrap">
                                  <p className="leading-[38px]">Orders</p>
                                </div>
                              </div>
                              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
                                <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#464646] text-[14px] whitespace-nowrap">
                                  <p className="leading-[normal]">Track, filter, update, and manage customer orders</p>
                                </div>
                              </div>
                            </div>
                            <div className="content-center flex flex-wrap gap-[0px_7.99px] items-center relative shrink-0" data-name="Container">
                              <div className="bg-white content-stretch flex flex-col items-center justify-center pb-[10.6px] pt-[9.8px] px-[12.8px] relative rounded-[10px] shrink-0" data-name="Button">
                                <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[10px]" />
                                <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12.7px] text-black text-center whitespace-nowrap">
                                  <p className="leading-[normal]">Export</p>
                                </div>
                              </div>
                              <div className="bg-gradient-to-b content-stretch flex flex-col from-[#da3b90] items-center justify-center pb-[10.6px] pt-[9.8px] px-[12.8px] relative rounded-[10px] shrink-0 to-[#c3237a]" data-name="Button">
                                <div aria-hidden="true" className="absolute border border-[#cf2d84] border-solid inset-0 pointer-events-none rounded-[10px]" />
                                <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12.8px] text-center text-white whitespace-nowrap">
                                  <p className="leading-[normal]">Add Order</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-center flex flex-wrap gap-[0px_8px] items-center relative size-full">
                            <InputBackgroundImage additionalClassNames="h-[36px] w-[280px]">
                              <div className="absolute content-stretch flex flex-col items-start left-[10.8px] overflow-clip pb-[0.8px] right-[24.4px] top-[10px]" data-name="Container">
                                <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#757575] text-[12.5px] whitespace-nowrap">
                                  <p className="leading-[normal]">Search orders, customers, cities...</p>
                                </div>
                              </div>
                              <div className="absolute content-stretch flex items-center left-[10.8px] right-[10.8px] top-[10px]" data-name="Container">
                                <div className="flex-[1_0_0] h-[16px] min-h-px min-w-px" data-name="Container" />
                                <div className="h-[9.6px] shrink-0 w-[13.6px]" data-name="Margin" />
                              </div>
                            </InputBackgroundImage>
                            <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
                              <div className="bg-white content-stretch flex items-center justify-center pb-[10.6px] pt-[9.8px] px-[12.8px] relative rounded-[10px] shrink-0" data-name="Button">
                                <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[10px]" />
                                <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12.6px] text-black text-center whitespace-nowrap">
                                  <p className="leading-[normal]">Filter</p>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white content-stretch flex flex-col h-[36px] items-start justify-center pl-[14.8px] pr-[26.8px] py-px relative rounded-[10px] shrink-0" data-name="Options">
                              <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[10px]" />
                              <div className="relative shrink-0" data-name="Container">
                                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[59.97px] py-[0.4px] relative rounded-[inherit]">
                                  <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12.1px] text-black whitespace-nowrap">
                                    <p className="leading-[15.2px]">Newest first</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white content-stretch flex flex-col h-[36px] items-start justify-center opacity-70 pl-[14.8px] pr-[26.8px] py-px relative rounded-[10px] shrink-0" data-name="Options">
                              <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[10px]" />
                              <div className="relative shrink-0" data-name="Container">
                                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[43.39px] py-[0.4px] relative rounded-[inherit]">
                                  <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6d6d6d] text-[12.4px] whitespace-nowrap">
                                    <p className="leading-[15.2px]">Bulk Actions</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white h-[58px] relative rounded-[12px] shrink-0 w-[1080px]" data-name="Background+Border">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-auto p-px relative size-full">
                            <div className="relative shrink-0 w-[1300px]" data-name="Table → Header → Row">
                              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center relative w-full">
                                <div className="content-stretch flex flex-col items-start pb-[15.6px] pt-[12px] px-[8px] relative shrink-0 w-[59.81px]" data-name="Cell">
                                  <div aria-hidden="true" className="absolute border-[#f9e5f2] border-b-[0.8px] border-solid inset-0 pointer-events-none" />
                                  <div className="bg-white relative rounded-[2.5px] shrink-0 size-[13px]" data-name="Input">
                                    <div aria-hidden="true" className="absolute border border-[#767676] border-solid inset-0 pointer-events-none rounded-[2.5px]" />
                                  </div>
                                </div>
                                <CellBackgroundImageAndText text="Order ID" additionalClassNames="px-[8px] w-[143.2px]" />
                                <CellBackgroundImageAndText text="Products" additionalClassNames="pl-[7.43px] pr-[8px] w-[163.94px]" />
                                <CellBackgroundImageAndText text="Customer Name" additionalClassNames="px-[8px] w-[239.41px]" />
                                <CellBackgroundImageAndText text="Price" additionalClassNames="px-[8px] w-[103.47px]" />
                                <CellBackgroundImageAndText text="Date" additionalClassNames="px-[8px] w-[93.03px]" />
                                <CellBackgroundImageAndText text="Status" additionalClassNames="px-[8px] w-[124.94px]" />
                                <CellBackgroundImageAndText text="Address" additionalClassNames="px-[8px] w-[144.73px]" />
                                <CellBackgroundImageAndText text="City" additionalClassNames="px-[8px] w-[88.13px]" />
                                <CellBackgroundImageAndText text="Actions" additionalClassNames="px-[8px] w-[139.35px]" />
                              </div>
                            </div>
                          </div>
                          <div aria-hidden="true" className="absolute border border-[#f9e5f2] border-solid inset-0 pointer-events-none rounded-[12px]" />
                        </div>
                        <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-center flex flex-wrap items-center justify-between relative size-full">
                            <div className="content-center flex flex-wrap gap-[0px_8px] items-center relative shrink-0" data-name="Container">
                              <ContainerBackgroundImageAndText text="Rows per page" />
                              <div className="bg-white content-stretch flex flex-col h-[36px] items-start justify-center pl-[14.8px] pr-[26.8px] py-px relative rounded-[10px] shrink-0" data-name="Options">
                                <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[10px]" />
                                <div className="relative shrink-0" data-name="Container">
                                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip py-[0.4px] relative rounded-[inherit]">
                                    <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[13.3px] text-black whitespace-nowrap">
                                      <p className="leading-[15.2px]">10</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <ContainerBackgroundImageAndText text="0-0 of 0 orders" />
                            <div className="content-center flex flex-wrap gap-[0px_8px] items-center relative shrink-0" data-name="Container">
                              <div className="bg-white content-stretch flex flex-col items-center justify-center pb-[10.6px] pt-[9.8px] px-[12.8px] relative rounded-[10px] shrink-0" data-name="Button">
                                <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[10px]" />
                                <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12.9px] text-black text-center whitespace-nowrap">
                                  <p className="leading-[normal]">Previous</p>
                                </div>
                              </div>
                              <ContainerBackgroundImageAndText text="Page 1" />
                              <div className="bg-white content-stretch flex flex-col items-center justify-center pb-[10.6px] pt-[9.8px] px-[12.8px] relative rounded-[10px] shrink-0" data-name="Button">
                                <div aria-hidden="true" className="absolute border border-[#f4dfee] border-solid inset-0 pointer-events-none rounded-[10px]" />
                                <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12.4px] text-black text-center whitespace-nowrap">
                                  <p className="leading-[normal]">Next</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}