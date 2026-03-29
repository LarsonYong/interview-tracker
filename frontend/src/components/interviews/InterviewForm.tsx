import { useEffect, useState } from "react";

import type {
  InterviewStage,
  InterviewStatus,
} from "../../features/interviews/types";

export type InterviewFormValues = {
  company: string;
  role: string;
  stage: InterviewStage;
  status: InterviewStatus;
  interviewDate: string;
  salary: string;
  jobUrl: string;
  notes: string;
};

type InterviewFormProps = {
  initialValues: InterviewFormValues;
  onSubmit: (values: InterviewFormValues) => void;
  onCancel?: () => void;
  submitLabel?: string;
};

const stageOptions: { label: string; value: InterviewStage }[] = [
  { label: "Applied", value: "APPLIED" },
  { label: "Phone", value: "PHONE" },
  { label: "Tech Screen", value: "TECH_SCREEN" },
  { label: "Onsite", value: "ONSITE" },
  { label: "Final", value: "FINAL" },
  { label: "HR", value: "HR" },
  { label: "Offer", value: "OFFER" },
  { label: "Rejected", value: "REJECTED" },
];

const statusOptions: { label: string; value: InterviewStatus }[] = [
  { label: "Active", value: "active" },
  { label: "Passed", value: "passed" },
  { label: "Rejected", value: "rejected" },
  { label: "Offer", value: "offer" },
];

export default function InterviewForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: InterviewFormProps) {
  const [values, setValues] = useState<InterviewFormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues])

  function updateField<K extends keyof InterviewFormValues>(
    key: K,
    value: InterviewFormValues[K]
  ) {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        <section className="rounded-3xl border border-white/60 bg-white/58 p-5 md:p-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
              Core Info
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            <FormField label="Company">
              <input
                type="text"
                required
                value={values.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="Company name"
                className={fieldClassName}
              />
            </FormField>

            <FormField label="Role">
              <input
                type="text"
                required
                value={values.role}
                onChange={(e) => updateField("role", e.target.value)}
                placeholder="Role or position"
                className={fieldClassName}
              />
            </FormField>

            <FormField label="Stage">
              <select
                value={values.stage}
                onChange={(e) =>
                  updateField("stage", e.target.value as InterviewStage)
                }
                className={fieldClassName}
              >
                {stageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Status">
              <select
                value={values.status}
                onChange={(e) =>
                  updateField("status", e.target.value as InterviewStatus)
                }
                className={fieldClassName}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </section>

        <section className="rounded-3xl border border-white/60 bg-white/58 p-5 md:p-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
              Details
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            <FormField label="Interview Date">
              <input
                type="datetime-local"
                value={values.interviewDate}
                onChange={(e) => updateField("interviewDate", e.target.value)}
                className={fieldClassName}
              />
            </FormField>

            <FormField label="Salary">
              <input
                type="number"
                min="0"
                value={values.salary}
                onChange={(e) => updateField("salary", e.target.value)}
                placeholder="Estimated or offered compensation"
                className={fieldClassName}
              />
            </FormField>

            <div className="md:col-span-2">
              <FormField label="Job URL">
                <input
                  type="url"
                  value={values.jobUrl}
                  onChange={(e) => updateField("jobUrl", e.target.value)}
                  placeholder="Link to the job posting"
                  className={fieldClassName}
                />
              </FormField>
            </div>

            <div className="md:col-span-2">
              <FormField label="Notes">
                <textarea
                  value={values.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  rows={5}
                  placeholder="Notes, feedback, or anything worth remembering"
                  className={textareaClassName}
                />
              </FormField>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12 flex items-center justify-end gap-3 border-t border-white/55 pt-8">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/55 bg-white/72 px-4 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-900"
          >
            Cancel
          </button>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-medium text-white shadow-[0_8px_20px_rgba(15,23,42,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.18)] disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
};

function FormField({ label, children }: FormFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
        {label}
      </span>
      {children}
    </label>
  );
}

const fieldClassName =
  "h-11 w-full rounded-2xl border border-slate-200/90 bg-white/94 px-4 text-sm text-slate-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.82)] outline-none backdrop-blur-xl transition-[border,box-shadow,background-color] duration-200 hover:border-slate-300/80 hover:bg-white focus:border-slate-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(15,23,42,0.05)]";

const textareaClassName =
  "min-h-[132px] w-full rounded-2xl border border-slate-200/90 bg-white/94 px-4 py-3 text-sm leading-6 text-slate-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.82)] outline-none backdrop-blur-xl transition-[border,box-shadow,background-color] duration-200 hover:border-slate-300/80 hover:bg-white focus:border-slate-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(15,23,42,0.05)] resize-none";