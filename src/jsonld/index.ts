export * from "./articles";
export * from "./blog";
export * from "./breadcrumbs";
export * from "./website";

export {
    default as JSONLinkedData,
    type Props as JSONLinkedDataProps
} from './JSONLinkedData.astro'

export type IdReference = {
    /** IRI identifying the canonical address of this object. */
    "@id": string;
};

export function idReference(id: string): IdReference {
    return { "@id": id }
}