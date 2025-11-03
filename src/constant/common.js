const appConstants = Object.freeze({
  // Validation patterns
  VALIDATION_PATTERNS: {
    onlyAlphabet: "^[a-zA-Z]+$", // Applicable for alphapet field
    alphaNumeric: "[أ-يa-zA-Z-_()0-9]+", // Applicable for alpha Numeric field
    alphaNumericWithDot: "[أ-يa-zA-Z-_()0-9.]+", // Applicable for alpha Numeric with dot
    alphaNumericWithSpace: "[أ-يa-zA-Z-_()0-9 ]+", // Applicable for alpha Numeric with space
    onlyNumber: "^[0-9]*$", // Applicable for Number field
    alphabetWithSpace: "^[a-zA-Z ]+$", // Applicable for alphapet with space
    phonenumber: "[+0-9 ]+", // Applicable for phone Number field
    email:
      "([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{1}[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]*)((@[a-zA-Z-]{2}[a-zA-Z-]*)[\\.](([a-zA-Z]{3}|[a-zA-Z]{2})|([a-zA-Z]{3}|[a-zA-Z]{2}).[a-zA-Z]{2}))", // Applicable for email field
    countryCode: "[+0-9]+", // Applicable for country code field
    password: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
    url: "https?://.+", // Applicable for URL field
    customUrl: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.com(?:\/[^\s/?#]+(?:\?(?:[^\s#&]+(?:=[^\s&]*)?&)*(?:[^\s#&]+(?:=[^\s&]*)?)?)?(?:#[^\s]*)?)?(?:\/[^\s]*)?(?:\/|(?![^\s]))?$/,
    priceFormatPattern: "[0-9.,]+", // Applicable for price format
  },

  pageOffSet : 0,
  pageSize: 20,
  listOffSet : 0,
  listSize: 10,
  maxFileSize: 250,
  restrictedFileTypes: ['exe'],
  intervalTime: 120000,
  commentsIntervalTime: 60000,
  periodic: {
    checkListEditableStages : ['TODO', 'INPROGRESS', 'QC', 'DM', 'TM', 'TR', 'MDT', 'WFA', 'ONLINE'],
    ticketToolEditableStages : ['TODO', 'INPROGRESS', 'QC', 'DM', 'TM', 'TR', 'MDT'],
    requirementEditableStages : ['OPEN','TODO', 'INPROGRESS', 'QC', 'DM', 'TM', 'TR', 'MDT', 'WFA', 'ONLINE'],
    generalFormDataEditableStages: ['OPEN','TODO', 'INPROGRESS'],
    toolFinancialYearEditableStages: ['OPEN','TODO', 'INPROGRESS'],
    toolCurrentReleaseDateEditableStages: ['OPEN','TODO', 'INPROGRESS', 'QC', 'DM', 'TM', 'TR', 'MDT', 'WFA', 'ONLINE'],
    toolUpcomingReleaseDateEditableStages: ['OPEN','TODO', 'INPROGRESS'],
    toolSourceLiveLinkEditableStages: ['OPEN','TODO', 'INPROGRESS']
  },
  agency: {
    requirementEditableStages : ['OPEN', 'PR', 'OR']
  },
  headerData: [
    {
      type: "new_card_created",
      header: "Card  Assigned",
    },
    {
      type: "moved the ticket",
      header: "Card Moved to",
    },
    {
      type: "ticket_assignee",
      header: "Card  Assigned",
    },
    {
      type: "ticket_re_assigned",
      header: "Card  Assigned",
    },
    {
      type: "subtask_assignee",
      header: "Card  Assigned",
    },
    {
      type: "due_date_set",
      header: "Due Date set",
    },
    {
      type: "order_date_set",
      header: "Order Date set",
    },
    {
      type: "participant_added",
      header: "",
    },
    {
      type: "tool_assignee",
      header: "Card  Assigned",
    },
    {
      type: "re_assigned_tool",
      header: "Card  Assigned",
    },
    {
      type: "tagged_comments",
      header: "",
    },
    {
      type: "financial_release",
      header: "Q1 Financial Release",
    },
    {
      type: "upsell_tools",
      header: "Upsell",
    },
    {
      type: "mentions",
      header: "You've been Tagged",
    },
    {
      type: "tagged_comments",
      header: "You've been Tagged",
    },
  ]
});

export default appConstants;

