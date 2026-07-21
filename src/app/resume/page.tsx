"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { useScrollState } from "@/context/ScrollContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import styles from "./resume.module.css";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: delay
    }
  })
};

export default function ResumePage() {
  // Trigger data preloading
  usePortfolioData();
  
  const { resume } = useScrollState();

  const name = resume?.fullName || "Loading Name...";
  const professionalTitles = resume?.professionalTitle || [];
  const primaryTitle = professionalTitles[0] || "Portfolio Owner";

  const email = resume?.contact?.email;
  const phone = resume?.contact?.phone;
  const location = resume?.contact?.location;

  const github = resume?.socialLinks?.github;
  const linkedin = resume?.socialLinks?.linkedin;

  const pdfUrl = resume?.resumePdf || null;

  return (
    <div className={styles.resumeContainer}>
      <main className={styles.page}>
        
        {/* ─── PAGE HEADER ─── */}
        <motion.div 
          className={styles.pageHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          custom={0}
          variants={revealVariants}
        >
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>Resume</span>
            <h1 className={styles.pageTitle}>
              <strong>Profile</strong> <em>snapshot.</em>
            </h1>
          </div>
          <Link href="/contact" className={styles.contactBtn}>
            <svg viewBox="0 0 24 24">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Contact me
          </Link>
        </motion.div>

        {/* ─── TWO-COLUMN BODY ─── */}
        <div className={styles.resumeColumns}>

          {/* ════════════════════════════════════════
               LEFT COLUMN — text resume
          ════════════════════════════════════════ */}
          <motion.div 
            className={styles.resumeText}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            custom={0.1}
            variants={revealVariants}
          >
            <div className={styles.resumeCard}>

              {/* Identity */}
              <div className={styles.resumeIdentity}>
                <div className={styles.resumeFullName}>{name}</div>
                <div className={styles.resumeTitleTag}>{primaryTitle}</div>
                {professionalTitles.length > 0 && (
                  <div className={styles.resumeTags}>
                    {professionalTitles.map((tag, idx) => (
                      <span key={`${idx}-${tag}`} className={styles.resumeTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Information */}
              {(email || phone || location) && (
                <div className={styles.resumeSection}>
                  <div className={styles.resumeSectionLabel}>Contact Information</div>
                  <div className={styles.contactRow}>
                    {email && (
                      <a href={`mailto:${email}`} className={styles.contactItem}>
                        <svg viewBox="0 0 24 24">
                          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        {email}
                      </a>
                    )}
                    {phone && (
                      <span className={styles.contactItem}>
                        <svg viewBox="0 0 24 24">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                        </svg>
                        {phone}
                      </span>
                    )}
                    {location && (
                      <span className={styles.contactItem}>
                        <svg viewBox="0 0 24 24">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {location}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Social Profiles */}
              {(github || linkedin) && (
                <div className={styles.resumeSection}>
                  <div className={styles.resumeSectionLabel}>Social Profiles</div>
                  <div className={styles.contactRow}>
                    {github && (
                      <a href={github} target="_blank" rel="noreferrer" className={styles.contactItem}>
                        <svg viewBox="0 0 24 24">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
                        </svg>
                        {github.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    )}
                    {linkedin && (
                      <a href={linkedin} target="_blank" rel="noreferrer" className={styles.contactItem}>
                        <svg viewBox="0 0 24 24">
                          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                          <circle cx="4" cy="4" r="2"/>
                        </svg>
                        {linkedin.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Profile Summaries */}
              <div className={styles.resumeSection}>
                <div className={styles.resumeSectionLabel}>Professional Summaries</div>
                <ul className={styles.profileBullets}>
                  {resume?.defaultSummary && (
                    <li>
                      <strong>[Default Summary]</strong> {resume.defaultSummary}
                    </li>
                  )}
                  {resume?.targetedSummaries && resume.targetedSummaries.length > 0 && (
                    resume.targetedSummaries.map((s) => (
                      <li key={s._id}>
                        <strong>[{s.audience} Audience Summary]</strong> {s.text}
                      </li>
                    ))
                  )}
                </ul>
              </div>

              {/* Download row */}
              <div className={styles.downloadRow}>
                <span className={styles.downloadNote}>PDF version available</span>
                {pdfUrl ? (
                  <a href={pdfUrl} download className={styles.downloadBtn}>
                    <svg viewBox="0 0 24 24">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                    Download PDF
                  </a>
                ) : (
                  <span className={styles.downloadBtn} style={{ opacity: 0.5, cursor: "not-allowed" }}>
                    No PDF uploaded
                  </span>
                )}
              </div>

            </div>
          </motion.div>

          {/* ════════════════════════════════════════
               RIGHT COLUMN — PDF / image viewer
          ════════════════════════════════════════ */}
          <motion.div 
            className={styles.resumeViewer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            custom={0.2}
            variants={revealVariants}
          >
            <div className={styles.viewerLabel}>
              <span className={styles.eyebrow}>Document view</span>
            </div>

            <div className={styles.viewerFrame}>
              {pdfUrl ? (
                <iframe src={pdfUrl} title={`${name} Resume`} />
              ) : (
                <div className={styles.viewerPlaceholder}>
                  <div className={styles.viewerPlaceholderIcon}>
                    <div className={styles.docLines}>
                      <div className={styles.docLine}></div>
                      <div className={styles.docLine}></div>
                      <div className={`${styles.docLine} ${styles.short}`}></div>
                      <div className={styles.docLine}></div>
                      <div className={`${styles.docLine} ${styles.shorter}`}></div>
                      <div className={styles.docLine}></div>
                    </div>
                  </div>
                  <div className={styles.placeholderText}>
                    <strong>No resume document attached</strong>
                    Once you upload a resume PDF to your backend profile,<br />
                    the live PDF document preview will display here.
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons below the viewer */}
            <div className={styles.viewerActions}>
              {pdfUrl ? (
                <>
                  <a href={pdfUrl} download className={`${styles.viewerBtn} ${styles.primary}`}>
                    <svg viewBox="0 0 24 24">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                    Download PDF
                  </a>
                  <a href={pdfUrl} target="_blank" rel="noreferrer" className={`${styles.viewerBtn} ${styles.secondary}`}>
                    <svg viewBox="0 0 24 24">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                    Open full screen
                  </a>
                </>
              ) : (
                <div className="flex gap-2.5 w-full">
                  <span className={`${styles.viewerBtn} ${styles.secondary} w-full opacity-50 cursor-not-allowed`}>
                    Preview Unavailable
                  </span>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
