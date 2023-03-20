export enum LoyaltyMemberStatuses {
    Activated = "Activated",
    Hold = "Hold",
    Deactivated = "Deactivated",
}

export enum LoyaltyProgramStatuses {
    Activated = "Activated",
    New = "New",
    Canceled = "Canceled",
    Deactivated = "Deactivated",
}

export enum PromotionCurrencyStatuses {
    Activated = "Activated",
    Deactivated = "Deactivated",
}

export enum IndividualCustSrceType {
    Web = "Web",
    CallCenter = "Call center",
    Ecommerce = "Ecommerce",
    Store = "Store",
}

export enum LoyaltyCurrencyStatuses {
    Draft = "Draft",
    Activated = "Activated",
    Deactivated = "Deactivated",
}

export enum TypeOfCurrencies {
    FixedPoint = "Fixed_Point",
    PriceProduct = "Price_Product",
    PriceService = "Price_Service",
}

export enum NameTypeRecordType {
    FixedPoint = "Fixed_Point",
    PriceProduct = "Price_Product",
    PriceService = "Price_Service",
}

export enum TypeOfPoints {
    Qualify = "Qualify",
    Award = "Award",
    Score = "Score",
}

export enum TypeOfBusiness {
    Corporate = "Corporate",
    Partner = "Partner",
    Supplier = "Supplier",
}

export enum LoyaltyPromotionStatuses {
    Activated = "Activated",
    Deactivated = "Deactivated",
    Draft = "Draft",
    Hold = "Hold",
}

export enum LoyaltyCurrencyTypes {
    FixedPoint = "Fixed_Point",
    PriceProduct = "Price_Product",
    PriceService = "Price_Service",
}

export enum BenefitTypeStatuses {
    Activated = "Activated",
    Deactivated = "Deactivated",
}

export enum BenefitStatuses {
    Activated = "Activated",
    Deactivated = "Deactivated",
    Draft = "Draft",
}

export enum BenefitTypes {
    Point = "Point",
    Voucher = "Voucher",
    NonPoint = "Non-Point",
}

export enum LoyaltyProgramTypes {
    B2B = "B2B",
    B2C = "B2C",
}

export enum LoyaltyPromotionTypes {
    StandardPromotion = "Standard_Promotion",
    SpecialPromotion = "Special_Promotion",
}

export enum LoyaltyTierRecurrentCycles {
    Monthly = "Monthly",
    Quarterly = "Quarterly",
    SemiAnnually = "Semi-annually",
    Annually = "Annually",
}

export enum LoyaltyTierRecurrentTypes {
    Keep = "Keep",
    Reset = "Reset",
}

export enum VoucherDefinitionTypes {
    IndividualVoucher = "Individual_Voucher",
    Gift = "Gift",
    MassVoucher = "Mass_Voucher",
}

export enum VoucherDefinitionStatuses {
    Draft = "Draft",
    Activated = "Activated",
    Deactivated = "Deactivated",
}

export enum LoyaltyTierStatuses {
    Draft = "Draft",
    Activated = "Activated",
    Deactivated = "Deactivated",
}

export enum VoucherStatuses {
    Issued = "Issued",
    Void = "Void",
    Expired = "Expired",
    Refunded = "Refunded",
    Canceled = "Canceled",
    Extended = "Extended",
}

export enum TypeOfVouchers {
    PERCENTAGE = "Percentage",
    AMOUNT = "Amount",
}

export enum TransactionTypes {
    EarnPoint = "EarnPoint",
    BurnPoint = "BurnPoint",
    TransferPoint = "TransferPoint",
    BuyPoint = "BuyPoint",
}

export enum TransactionStatues {
    Success = "Success",
    Error = "Error",
}

export enum Sources {
    WEB = "Web",
    Agent = "Agent",
    App = "App",
}

export enum ProductGender {
    Male = "Male",
    Female = "Female",
    All = "All",
}

export enum TenantUserRolePermissionNames {
    LoyaltyManager = "Loyalty Manager",
    PromotionManager = "Promotion Manager",
    DataManager = "Data Manager",
    ServiceAgent = "Service Agent",
}

export enum DeveloperNameTypes {
    FixedPoint = "Fixed_Point",
    Price_Product = "Price_Product",
    Price_Service = "Price_Service",
    Individual_Voucher = "Individual_Voucher",
    Gift = "Gift",
    Mass_Voucher = "Mass_Voucher",
    Point = "Point",
    Voucher = "Voucher",
    Standard_Promotion = "Standard_Promotion",
    Special_Promotion = "Special_Promotion"
}

export enum RecordTypeStatuses {
    Active = "true",
    Deactivate = "false"
}
