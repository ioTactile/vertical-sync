import { useDeleteTalk } from "@/modules/core/mutations/useDeleteTalk";
import { useCreateReport } from "@/modules/core/mutations/useCreateReport";
import { useAuthAction } from "@/app/_hooks/use-auth-action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateReportInputs,
  createReportSchema,
} from "@/modules/react/sections/_schemas/create-report";
import { CreateReportDto } from "@/modules/core/model/Report";
import * as React from "react";
import { ReportEntityType } from "@/modules/core/domain/enums";
import { useUserStore } from "@/modules/core/store/store";

export const useTalkActions = (talkId: string) => {
  const { user } = useUserStore();
  const { handleAuthAction } = useAuthAction();
  const deleteTalkMutation = useDeleteTalk();
  const createReportMutation = useCreateReport();

  const [isReportModalOpen, setIsReportModalOpen] =
    React.useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const form = useForm<CreateReportInputs>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      reason: "",
      entityType: ReportEntityType.TALK,
      entityId: talkId,
    },
  });

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    deleteTalkMutation.mutate(talkId);
  };

  const handleReport = (data: CreateReportInputs) => {
    handleAuthAction((user) => {
      const report: CreateReportDto = {
        ...data,
        reporterId: user.id,
      };

      createReportMutation.mutate(report, {
        onSuccess: () => {
          setIsReportModalOpen(false);
          setIsMenuOpen(false);
          form.reset();
        },
      });
    });
  };

  const handleStopPropagation = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.stopPropagation();
  };

  return {
    user,
    form,
    isReportModalOpen,
    setIsReportModalOpen,
    isMenuOpen,
    setIsMenuOpen,
    handleDelete,
    handleReport,
    handleStopPropagation,
  };
};
