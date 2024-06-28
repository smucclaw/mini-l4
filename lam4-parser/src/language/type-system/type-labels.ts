import { AstNode } from "langium";
import {
    SigDecl,
} from "../generated/ast.js"; 

export interface TypeLabel {
    readonly $type: string;
    readonly astNode: AstNode;
    toString(): string;
}

/*============= Boolean ================================ */

export class BooleanTLabel implements TypeLabel {
    readonly $type = "Boolean";
    readonly astNode: AstNode;
    constructor(astNode: AstNode) {
        this.astNode = astNode;
    }
    toString() {
        return this.$type;
    }
}

export function isBooleanTLabel(label: TypeLabel) {
    return label.$type == "Boolean";
}

/*============= String ================================ */

export class StringTLabel implements TypeLabel {
    readonly $type = "String";
    readonly astNode: AstNode;
    constructor(astNode: AstNode) {
        this.astNode = astNode;
    }
    toString() {
        return this.$type;
    }
}

export function isStringTLabel(label: TypeLabel): label is StringTLabel {
    return label.$type === "String";
}

/*============= Integer ================================ */

export class IntegerTLabel implements TypeLabel {
    readonly $type = "Integer";
    readonly astNode: AstNode;
    constructor(astNode: AstNode) {
        this.astNode = astNode;
    }
    toString() {
        return this.$type;
    }
}

export function isIntegerTLabel(label: TypeLabel): label is IntegerTLabel {
    return label.$type === "Integer";
}

/*============= Fraction ================================ */

export class FractionTLabel implements TypeLabel {
    readonly $type = "Fraction";
    readonly astNode: AstNode;
    constructor(astNode: AstNode) {
        this.astNode = astNode;
    }
    toString() {
        return this.$type;
    }
}

export function isFractionTLabel(label: TypeLabel): label is FractionTLabel {
    return label.$type === "Fraction";
}

/*============= Date ================================ */

export class DateTLabel implements TypeLabel {
    readonly $type = "Date";
    readonly astNode: AstNode;
    constructor(astNode: AstNode) {
        this.astNode = astNode;
    }
    toString() {
        return this.$type;
    }
}

export function isDateTLabel(label: TypeLabel): label is DateTLabel {
    return label.$type === "Date";
}

/*============= Function ================================ */

export class FunctionTLabel implements TypeLabel {
    readonly $type = "Function";
    readonly astNode: AstNode;
    readonly returnType: TypeLabel;
    readonly parameters: FunctionParameter[];
    constructor(astNode: AstNode, returnType: TypeLabel, parameters: FunctionParameter[]) {
        this.astNode = astNode;
        this.returnType = returnType;
        this.parameters = parameters;
    }
    toString() {
        const params = this.parameters.map(p => `${p.name}: ${p.type.toString()}`).join(', ');
        return `(${params}) => ${this.returnType.toString()}`;
    }
}

//TODO  not sure we really need this?
export interface FunctionParameter {
    name: string;
    type: TypeLabel;
}

export function isFunctionTLabel(label: TypeLabel): label is FunctionTLabel {
    return label.$type === "Function";
}

/*============= Sig ================================ */

export class SigTLabel implements TypeLabel {
    readonly $type = "Sig";
    readonly astNode: AstNode;
    constructor(astNode: AstNode) {
        this.astNode = astNode;
    }
    toString() {
        return (this.astNode as SigDecl).name;
    }
}

export function isSigTLabel(label: TypeLabel): label is SigTLabel {
    return label.$type === "Sig";
}

/*============= Error ================================ */

export class ErrorType implements TypeLabel {
    readonly $type = "Error";
    readonly astNode: AstNode;
    readonly message: string;
    constructor(astNode: AstNode, message: string) {
        this.astNode = astNode;
        this.message = message;
    }
    toString() {
        return `Error: ${this.message}`;
    }
}

export function isErrorType(item: TypeLabel): item is ErrorType {
    return item.$type === "error";
}
