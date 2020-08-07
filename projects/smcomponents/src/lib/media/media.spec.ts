import { createColorFromArgb, smColorToCssColor } from "./color";

describe("Test color type", () => {
   it("should create color type using individual value", () => {
     let color = createColorFromArgb(255,255,0,0);
     expect(smColorToCssColor(color)).toBe("#FF0000");
     color = createColorFromArgb(255,255,255,0);
     expect(smColorToCssColor(color)).toBe("#FFFF00");

     color = createColorFromArgb(255,0,255,0);
     expect(smColorToCssColor(color)).toBe("#00FF00");

     color = createColorFromArgb(255,1,5,255);
     expect(smColorToCssColor(color)).toBe("#0105FF");
   });
});