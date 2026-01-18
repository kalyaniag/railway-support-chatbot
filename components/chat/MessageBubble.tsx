"use client";

import { useState } from "react";
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { User, ExternalLink, CheckCircle2 } from "lucide-react";
import DishaAvatar from "./DishaAvatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RefundStatusCard from "./RefundStatusCard";
import PNRDetailsCard from "./PNRDetailsCard";
import TrainStatusCard from "./TrainStatusCard";
import RefundStatusTracker from "./RefundStatusTracker";
import RefundCalculatorForm from "./RefundCalculatorForm";
import RefundHistoryDashboard from "./RefundHistoryDashboard";
import AlternativeTrainsCard from "./AlternativeTrainsCard";
import TDRFilingWizard from "./TDRFilingWizard";
import TicketBookingWizard from "./TicketBookingWizard";

interface MessageBubbleProps {
  message: Message;
}

interface TDRSubmissionData {
  pnr: string;
  reason: string;
  description: string;
  bankAccount: string;
  ifscCode: string;
}

interface BookingSubmissionData {
  fromStation: string;
  toStation: string;
  journeyDate: string;
  travelClass: string;
  quota: string;
  passengers: {
    name: string;
    age: string;
    gender: string;
    berthPreference: string;
  }[];
  contactEmail: string;
  contactMobile: string;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isBot = message.role === "bot";
  const [tdrSubmitted, setTdrSubmitted] = useState(false);
  const [submittedTDR, setSubmittedTDR] = useState<TDRSubmissionData | null>(
    null,
  );
  const [tdrNumber, setTdrNumber] = useState<string>("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [submittedBooking, setSubmittedBooking] =
    useState<BookingSubmissionData | null>(null);
  const [pnrNumber, setPnrNumber] = useState<string>("");

  const handleTDRSubmit = (data: TDRSubmissionData) => {
    setSubmittedTDR(data);
    setTdrNumber(`TDR${Date.now().toString().slice(-8)}`);
    setTdrSubmitted(true);
  };

  const handleBookingSubmit = (data: BookingSubmissionData) => {
    setSubmittedBooking(data);
    setPnrNumber(`${Math.floor(1000000000 + Math.random() * 9000000000)}`);
    setBookingSubmitted(true);
  };

  return (
    <div
      className={cn("flex gap-3 mb-4", isBot ? "justify-start" : "justify-end")}
    >
      {isBot && <DishaAvatar size="sm" showRing={false} />}

      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-3 shadow-sm",
          isBot
            ? "bg-gray-50 text-gray-800 border border-gray-200"
            : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white",
        )}
      >
        {isBot ? (
          <div className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2 prose-p:my-2 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:my-2 prose-li:my-1 prose-li:text-gray-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="text-sm whitespace-pre-wrap leading-relaxed text-white">
            {message.content}
          </div>
        )}

        {/* Show rich content if available */}
        {isBot && message.richContent && (
          <>
            {message.richContent.type === "refund-timeline" &&
              message.richContent.ticketType && (
                <RefundStatusCard ticketType={message.richContent.ticketType} />
              )}

            {message.richContent.type === "pnr-details" &&
              message.richContent.data && (
                <PNRDetailsCard
                  pnrData={
                    message.richContent.data as unknown as Parameters<
                      typeof PNRDetailsCard
                    >[0]["pnrData"]
                  }
                />
              )}

            {message.richContent.type === "train-status" &&
              message.richContent.data && (
                <TrainStatusCard
                  trainStatus={
                    message.richContent.data as unknown as Parameters<
                      typeof TrainStatusCard
                    >[0]["trainStatus"]
                  }
                />
              )}

            {message.richContent.type === "refund-status" &&
              message.richContent.data && (
                <RefundStatusTracker
                  refundData={
                    message.richContent.data as unknown as Parameters<
                      typeof RefundStatusTracker
                    >[0]["refundData"]
                  }
                />
              )}

            {message.richContent.type === "refund-calculator" && (
              <RefundCalculatorForm onCalculate={() => {}} />
            )}

            {message.richContent.type === "refund-history" &&
              message.richContent.data && (
                <RefundHistoryDashboard
                  records={
                    message.richContent.data as unknown as Parameters<
                      typeof RefundHistoryDashboard
                    >[0]["records"]
                  }
                />
              )}

            {message.richContent.type === "alternative-trains" &&
              message.richContent.data && (
                <AlternativeTrainsCard
                  originalTrain={
                    message.richContent.data.originalTrain as string
                  }
                  alternatives={
                    message.richContent.data.alternatives as Parameters<
                      typeof AlternativeTrainsCard
                    >[0]["alternatives"]
                  }
                  reason={message.richContent.data.reason as string}
                />
              )}

            {message.richContent.type === "tdr-filing" &&
              (tdrSubmitted && submittedTDR ? (
                <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800">
                        TDR Submitted Successfully
                      </h4>
                      <p className="text-sm text-green-600">
                        Your refund claim has been registered
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-green-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">TDR Number</span>
                      <span className="font-bold text-green-700">
                        {tdrNumber}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">PNR</span>
                      <span className="font-semibold text-gray-800">
                        {submittedTDR.pnr}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Reason</span>
                      <span className="font-semibold text-gray-800">
                        {submittedTDR.reason}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Bank Account
                      </span>
                      <span className="font-semibold text-gray-800">
                        ****{submittedTDR.bankAccount.slice(-4)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Next Steps:</strong> Your TDR will be reviewed
                      within 15-30 days. Refund amount, if approved, will be
                      credited to your bank account.
                    </p>
                  </div>
                </div>
              ) : (
                <TDRFilingWizard onSubmit={handleTDRSubmit} />
              ))}

            {message.richContent.type === "ticket-booking" &&
              (bookingSubmitted && submittedBooking ? (
                <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800">
                        Booking Confirmed (Demo)
                      </h4>
                      <p className="text-sm text-green-600">
                        Your ticket has been booked successfully
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-green-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">PNR Number</span>
                      <span className="font-bold text-green-700">
                        {pnrNumber}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Route</span>
                      <span className="font-semibold text-gray-800">
                        {submittedBooking.fromStation} →{" "}
                        {submittedBooking.toStation}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Date</span>
                      <span className="font-semibold text-gray-800">
                        {new Date(
                          submittedBooking.journeyDate,
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Class</span>
                      <span className="font-semibold text-gray-800">
                        {submittedBooking.travelClass}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Passengers</span>
                      <span className="font-semibold text-gray-800">
                        {submittedBooking.passengers.length}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> This is a demo booking. E-ticket
                      has been sent to {submittedBooking.contactEmail}. Please
                      carry a valid ID proof during the journey.
                    </p>
                  </div>
                </div>
              ) : (
                <TicketBookingWizard
                  onSubmit={handleBookingSubmit}
                  initialFrom={(message.richContent.data?.from as string) || ""}
                  initialTo={(message.richContent.data?.to as string) || ""}
                />
              ))}
          </>
        )}

        {/* Show link button if available */}
        {isBot && message.link && (
          <a
            href={message.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm"
          >
            <span>Book Tickets on IRCTC</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}

        <div
          className={cn(
            "text-xs mt-2 flex items-center gap-1",
            isBot ? "text-gray-400" : "text-blue-100",
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center shadow-sm">
          <User className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
      )}
    </div>
  );
}
