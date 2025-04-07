import { User, UserDocuments } from './model';
export interface UpdateUserLicenseDocumentInterface {
    customer: User | null;
    frontUrl: string | null;
    backUrl: string | null
}

export interface UpdateUserDocumentInterface {
    customer: User | null,
    documents: UserDocuments | null
}