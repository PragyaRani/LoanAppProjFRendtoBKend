export interface ILoan {
    loanNumber: string,
    loanType: "HOUSE_LOAN" | "EDUCATION_LOAN" | "AUTOMOBILE_LOAN" | "BUSINESS_LOAN" | "PERSONAL_LOAN",
    loaneeFirstName: string,
    loaneeLastName: string,
    approvedBy: string,
    created: string // Date
}