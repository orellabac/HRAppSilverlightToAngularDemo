import { StringBuilder, createStringWithChar, removeCharsFromString, concatStringsSequence, stringTrimLeftChar, stringTrimRightChar, stringInsert } from "../StringBuilder";

describe('"StringBuilder" utility class', () => {
    it("should create a new string with append line", () => {
        let sb = new StringBuilder();
        sb.appendLine("first");
        sb.appendLine("second");
        expect(sb.toString()).toBe("first\r\nsecond\r\n");
    });

    it("should append elements", () => {
        let sb = new StringBuilder();
        sb.append("one,");
        sb.append("two,");
        sb.append("three");
        expect(sb.toString()).toBe("one,two,three");
    });

    it("should access elements by index", () => {
        let sb = new StringBuilder("Hello ");
        sb.append("world!");        
        expect(sb.toString()).toBe("Hello world!");
        expect(sb.getItem(0)).toBe("H");
        expect(sb.getItem(sb.length - 1)).toBe("!");
        sb.setItem(sb.length - 1, "X");
        expect(sb.toString()).toBe("Hello worldX");
    });

    it("should append elements with format", () => {
        let sb = new StringBuilder();
        sb.appendFormat("---{0}...{0}...", "one");
        expect(sb.toString()).toBe("---one...one...");
    });
});

describe('string utilities', () => {
    it("should create a string with a base character", () => {
        let str = createStringWithChar("X", 10);
        expect(str).toBe("XXXXXXXXXX");
    });

    it("should work with invalid values", () => {
        let str = createStringWithChar("X", -3);
        expect(str).toBe("X".slice());        
    });
});

describe('string method replacements', () => {
   it("should have a replacement for String.Remove", () => {
        let str1 = "Hello world";
        expect(removeCharsFromString(str1, 3)).toBe('Hel');
        expect(removeCharsFromString(str1, 3, 3)).toBe('Helworld');
   });

   it("should have a replacement for String.Join", () => {
    let str1 = ["A", "b", "C"];
    expect(concatStringsSequence(':', str1)).toBe('A:b:C');
   });

   it("should insert string in a position", () => {
       let str = "abcd";
       expect(stringInsert(str, 3, "xyz")).toBe('abcxyzd');
   });
});

describe('string trim utilities', () => {
    it("should do left trim based on characters", () => {
        let str = "xxxxxhello";
        expect(stringTrimLeftChar(str, 'x')).toBe("hello");
    });
    it("should do trim left trim all characters", () => {
        let str = "xxxx";
        expect(stringTrimLeftChar(str, 'x')).toBe("");
    });
    it("should do trim on empty string", () => {
        let str = "";
        expect(stringTrimLeftChar(str, 'x')).toBe("");
    });
    it("should do right trim based on characters", () => {
        let str = "xxxxxhelloxxxx";
        expect(stringTrimRightChar(str, 'x')).toBe("xxxxxhello");
    });
    it("should do right trim based on all characters", () => {
        let str = "xxxxx";
        expect(stringTrimRightChar(str, 'x')).toBe("");
    });
    it("should do right trim based on empty string", () => {
        let str = "";
        expect(stringTrimRightChar(str, 'x')).toBe("");
    });
});
