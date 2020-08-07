import { Guid } from "../Guid";


describe("Guid creation and parsing", () =>{
    it("should parse a simple Guid", () =>{
        let guid = Guid.parse('391A59D6-03DA-E411-80CA-00155D0EF605');
        expect(guid).toBeDefined();
    });

    it("should compare two guids", () =>{
        let guid1 = Guid.parse('391A59D6-03DA-E411-80CA-00155D0EF605');
        let guid2 = Guid.parse('391a59D6-03dA-E411-80CA-00155D0EF605');
        let guid3 = Guid.parse('391a59D6-03dA-E411-80CA-00155302F605');
        expect(guid1.equals(guid2)).toBeTrue();
        expect(guid1.equals(guid3)).toBeFalse();
        expect(guid1.equals(guid1)).toBeTrue();
    });

    it("should not parse a simple Guid", () =>{
        expect(() => Guid.parse('391A59-00155D0EF605')).toThrowError();
    });
});