export const defaultPermissions = {
  change_delivery_address: true,
  ad_manage: false,
  user_notification: false,
};

const colorCombinations = [
  {
      "c1": "#1890FF",
      "c2": "#FFFFFF",
      "c3": "#FFFFFF",
      "c4": "#000000d9",
      "c5": "#1890FF"
  },
  {
      "c1": "#581845",
      "c2": "#900C3F",
      "c3": "#C70039",
      "c4": "#FF5733",
      "c5": "#FFC300"
  },
  {
      "c1": "#14262C",
      "c2": "#32726B",
      "c3": "#7DA49C",
      "c4": "#F1F2EE ",
      "c5": "#CB5324"
  }
];

export const palettes = [
  {
      "label": "Palette Default #1",
      "primaryColor": colorCombinations[0].c1,
      "secondaryColor": colorCombinations[0].c1,
      "processingColor": colorCombinations[0].c1,
      "layoutHeaderBg": colorCombinations[0].c2,
      "layoutSiderBg": colorCombinations[0].c2,
      "pageHeaderBg": colorCombinations[0].c3,
      "textColor": colorCombinations[0].c4,
      "textSecondaryColor": colorCombinations[0].c4,
      "headingColor": colorCombinations[0].c4,
      "btnPrimaryColor": colorCombinations[0].c5
  },
  {
      "label": "Palette #2",
      "primaryColor": colorCombinations[1].c1,
      "secondaryColor": colorCombinations[1].c1,
      "processingColor": colorCombinations[1].c1,
      "layoutHeaderBg": colorCombinations[1].c2,
      "layoutSiderBg": colorCombinations[1].c2,
      "pageHeaderBg": colorCombinations[1].c3,
      "textColor": colorCombinations[1].c4,
      "textSecondaryColor": colorCombinations[1].c4,
      "headingColor": colorCombinations[1].c4,
      "btnPrimaryColor": colorCombinations[1].c5
  },
  {
      "label": "Palette #3",
      "primaryColor": colorCombinations[2].c1,
      "secondaryColor": colorCombinations[2].c1,
      "processingColor": colorCombinations[2].c1,
      "layoutHeaderBg": colorCombinations[2].c2,
      "layoutSiderBg": colorCombinations[2].c2,
      "pageHeaderBg": colorCombinations[2].c3,
      "textColor": colorCombinations[2].c4,
      "textSecondaryColor": colorCombinations[2].c4,
      "headingColor": colorCombinations[2].c4,
      "btnPrimaryColor": colorCombinations[2].c5
  }
]

export const colorPickers = [
  {
      label: "Primary color",
      extra: "Primary color",
      itemName: "primary_color",
      themeKey: "primaryColor",
      swatchClickHandler: "handleSwatchClick",
      swatchState: "displayPrimaryPicker",
      pickerCloseHandler: "handlePickerClose",
      colorChangeHandler: "handlePrimaryPickerChange"
  },
  {
      label: "Secondary color",
      extra: "Secondary color",
      itemName: "secondary_color",
      themeKey: "secondaryColor",
      swatchClickHandler: "handleSwatchClick",
      swatchState: "displaySecondaryPicker",
      pickerCloseHandler: "handlePickerClose",
      colorChangeHandler: "handleSecondaryPickerChange"
  },
  {
      label: "Text color",
      extra: "Text color",
      itemName: "text_color",
      themeKey: "textColor",
      swatchClickHandler: "handleSwatchClick",
      swatchState: "displayTextPicker",
      pickerCloseHandler: "handlePickerClose",
      colorChangeHandler: "handleTextPickerChange"
  },
  {
      label: "Text secondary color",
      extra: "Text secondary color",
      itemName: "text_secondary_color",
      themeKey: "textSecondaryColor",
      swatchClickHandler: "handleSwatchClick",
      swatchState: "displayTextSecondaryPicker",
      pickerCloseHandler: "handlePickerClose",
      colorChangeHandler: "handleTextSecondaryPickerChange"
  },
  {
      label: "Heading color",
      extra: "Heading color",
      itemName: "heading_color",
      themeKey: "headingColor",
      swatchClickHandler: "handleSwatchClick",
      swatchState: "displayHeadingPicker",
      pickerCloseHandler: "handlePickerClose",
      colorChangeHandler: "handleHeadingPickerChange"
  },
  {
      label: "Layout header background",
      extra: "Layout header background",
      itemName: "layout_header_bg",
      themeKey: "layoutHeaderBg",
      swatchClickHandler: "handleSwatchClick",
      swatchState: "displayLayoutHeaderPicker",
      pickerCloseHandler: "handlePickerClose",
      colorChangeHandler: "handleHeaderBgPickerChange"
  },
  {
      label: "Page header background",
      extra: "Page header background",
      itemName: "page_header_bg",
      themeKey: "pageHeaderBg",
      swatchClickHandler: "handleSwatchClick",
      swatchState: "displayPageHeaderPicker",
      pickerCloseHandler: "handlePickerClose",
      colorChangeHandler: "handlePageHeaderPickerChange"
  },
  {
      label: "Layout sider background",
      extra: "Layout sider background",
      itemName: "layout_sider_bg",
      themeKey: "layoutSiderBg",
      swatchClickHandler: "handleSwatchClick",
      swatchState: "displaySiderBgPicker",
      pickerCloseHandler: "handlePickerClose",
      colorChangeHandler: "handleSiderBgPickerChange"
  },
  {
      label: "Button primary color",
      extra: "Button primary color",
      itemName: "btn_primary_color",
      themeKey: "btnPrimaryColor",
      swatchClickHandler: "handleSwatchClick",
      swatchState: "displayBtnPrimaryPicker",
      pickerCloseHandler: "handlePickerClose",
      colorChangeHandler: "handleButtonPickerChange"
  },
  {
      label: "Processing color",
      extra: "Processing color",
      itemName: "processing_color",
      themeKey: "processingColor",
      swatchClickHandler: "handleSwatchClick",
      swatchState: "displayProcessingPicker",
      pickerCloseHandler: "handlePickerClose",
      colorChangeHandler: "handleProcessingPickerChange"
  }
]
