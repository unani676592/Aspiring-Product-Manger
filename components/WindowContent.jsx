"use client";

function Section({ label, children }) {
  return (
    <div className="mb-3">
      <div className="mb-1 inline-block bg-mint px-1 text-[7px] uppercase tracking-wider text-plum">
        {label}
      </div>
      <p className="text-[8px] leading-relaxed text-plum">{children}</p>
    </div>
  );
}

export default function WindowContent({ content }) {
  if (content.type === "trash") {
    return (
      <div>
        <p className="mb-3 text-[8px] leading-relaxed text-plum/80">
          {content.intro}
        </p>
        <ul className="space-y-2">
          {content.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-2 text-[8px] leading-relaxed text-plum"
            >
              <span className="text-plum/50">✗</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      {content.subtitle ? (
        <div className="mb-3 text-[7px] uppercase tracking-wider text-plum/50">
          {content.subtitle}
        </div>
      ) : null}
      <Section label="Problem">{content.problem}</Section>
      <Section label="Approach">{content.approach}</Section>
      <Section label="Key Decision">{content.decision}</Section>

      {content.impact ? (
        <div className="mb-3">
          <div className="mb-2 inline-block bg-mint px-1 text-[7px] uppercase tracking-wider text-plum">
            Impact &amp; Product Validation
          </div>
          <div className="space-y-2">
            {content.impact.map((pt) => (
              <p
                key={pt.lead}
                className="text-[8px] leading-relaxed text-plum"
              >
                <span className="font-bold underline decoration-plum/60 underline-offset-2">
                  {pt.lead}:
                </span>{" "}
                {pt.text}
              </p>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex items-center gap-2">
        <span className="text-[7px] uppercase tracking-wider text-plum/50">
          Status
        </span>
        <span className="border-2 border-plum bg-mint px-2 py-1 text-[8px] text-plum">
          {content.status}
        </span>
      </div>
    </div>
  );
}
