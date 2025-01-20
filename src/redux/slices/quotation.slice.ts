import { NewQuotation, QuotationDraftSummary } from "@/types/quotations.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QuotationState {
  quotations: NewQuotation[];
  summary: QuotationDraftSummary[];
  reuse: NewQuotation | null;
}

const initialState: QuotationState = {
  quotations: [],
  summary: [],
  reuse: null,
};

const createSummary = (draft: NewQuotation): QuotationDraftSummary => {
  const { quotationId, clientData } = draft;
  const clientName = clientData.name;
  const contactPerson = clientData.contactPerson;

  return {
    name: (clientName
      ? `${clientName}${contactPerson ? ` (${contactPerson})` : ""}`
      : contactPerson || "Unknown"
    ).substring(0, 24),
    quotationId,
  };
};

const quotationsSlice = createSlice({
  name: "quotations",
  initialState: initialState,
  reducers: {
    saveQuotationDraft: (state, action: PayloadAction<NewQuotation>) => {
      if (state.summary.length >= 5) return;

      const draft = action.payload as NewQuotation;
      const { quotationId } = draft;

      const existingIndex = state.summary.findIndex(
        (item) => item.quotationId === quotationId
      );

      const summary = createSummary(draft);

      if (existingIndex >= 0) {
        state.quotations[existingIndex] = draft;
        state.summary[existingIndex] = summary;
        return;
      }

      state.quotations.push(draft);
      state.summary.push(summary);
      return;
    },
    removeQuotationDraft: (state, action: PayloadAction<number>) => {
      const draftId = action.payload as number;
      state.quotations = state.quotations.filter(
        (item) => item.quotationId !== draftId
      );
      state.summary = state.summary.filter(
        (item) => item.quotationId !== draftId
      );
    },
    clearQuotationDrafts: (state) => {
      state.quotations = [];
      state.summary = [];
    },
    setReuseQuotations: (state, action: PayloadAction<NewQuotation>) => {
      state.reuse = action.payload;
    },
    clearReuseQuotations: (state) => {
      state.reuse = null;
    },
  },
});

export const {
  saveQuotationDraft,
  clearQuotationDrafts,
  removeQuotationDraft,
  setReuseQuotations,
  clearReuseQuotations,
} = quotationsSlice.actions;
export const quotationsReducer = quotationsSlice.reducer;
