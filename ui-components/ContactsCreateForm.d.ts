import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ContactsCreateFormInputValues = {
    name?: string;
    phone?: string;
    email?: string;
    type?: string;
    ssn?: string;
    ein?: string;
    dba?: string;
    notes?: string;
    owner?: string;
};
export declare type ContactsCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    ssn?: ValidationFunction<string>;
    ein?: ValidationFunction<string>;
    dba?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ContactsCreateFormOverridesProps = {
    ContactsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    ssn?: PrimitiveOverrideProps<TextFieldProps>;
    ein?: PrimitiveOverrideProps<TextFieldProps>;
    dba?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ContactsCreateFormProps = React.PropsWithChildren<{
    overrides?: ContactsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ContactsCreateFormInputValues) => ContactsCreateFormInputValues;
    onSuccess?: (fields: ContactsCreateFormInputValues) => void;
    onError?: (fields: ContactsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ContactsCreateFormInputValues) => ContactsCreateFormInputValues;
    onValidate?: ContactsCreateFormValidationValues;
} & React.CSSProperties>;
export default function ContactsCreateForm(props: ContactsCreateFormProps): React.ReactElement;
