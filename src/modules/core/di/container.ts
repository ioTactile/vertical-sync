/**
 * Composition root — wires adapters (repos) → application (services).
 * API routes / jobs import singletons from here.
 */
import { PrismaArticleRepository } from '@/modules/core/repository/article.repository';
import { PrismaTalkRepository } from '@/modules/core/repository/talk.repository';
import { PrismaTagRepository } from '@/modules/core/repository/tag.repository';
import { PrismaClimbingSpotRepository } from '@/modules/core/repository/climbing-spot.repository';
import { PrismaClimbingSpotAlertRepository } from '@/modules/core/repository/climbing-spot-alert.repository';
import { PrismaClimbingSpotConditionRepository } from '@/modules/core/repository/climbing-spot-condition.repository';
import { PrismaNotificationRepository } from '@/modules/core/repository/notification.repository';
import { PrismaReportRepository } from '@/modules/core/repository/report.repository';
import { OpenMeteoRepository } from '@/modules/core/repository/weather.repository';
import { S3UploadRepository } from '@/modules/core/repository/upload.repository';
import { s3Client } from '@/lib/s3';

import { ArticleService } from '@/modules/core/service/article.service';
import { TalkService } from '@/modules/core/service/talk.service';
import { TagService } from '@/modules/core/service/tag.service';
import { ClimbingSpotService } from '@/modules/core/service/climbing-spot.service';
import { ClimbingSpotAlertService } from '@/modules/core/service/climbing-spot-alert.service';
import { ClimbingSpotConditionService } from '@/modules/core/service/climbing-spot-condition.service';
import { NotificationService } from '@/modules/core/service/notification.service';
import { ReportService } from '@/modules/core/service/report.service';
import { WeatherService } from '@/modules/core/service/weather.service';
import { UploadService } from '@/modules/core/service/upload.service';
import {
  AlertEvaluationService,
  type AlertEvaluationDeps,
} from '@/modules/core/service/alert-evaluation.service';

function createContainer() {
  const articleRepository = new PrismaArticleRepository();
  const talkRepository = new PrismaTalkRepository();
  const tagRepository = new PrismaTagRepository();
  const climbingSpotRepository = new PrismaClimbingSpotRepository();
  const climbingSpotAlertRepository = new PrismaClimbingSpotAlertRepository();
  const climbingSpotConditionRepository = new PrismaClimbingSpotConditionRepository();
  const notificationRepository = new PrismaNotificationRepository();
  const reportRepository = new PrismaReportRepository();
  const weatherRepository = new OpenMeteoRepository();
  const uploadRepository = new S3UploadRepository(s3Client);

  const articleService = new ArticleService(articleRepository);
  const talkService = new TalkService(talkRepository);
  const tagService = new TagService(tagRepository);
  const climbingSpotService = new ClimbingSpotService(climbingSpotRepository);
  const climbingSpotAlertService = new ClimbingSpotAlertService(climbingSpotAlertRepository);
  const climbingSpotConditionService = new ClimbingSpotConditionService(
    climbingSpotConditionRepository,
  );
  const notificationService = new NotificationService(notificationRepository);
  const reportService = new ReportService(reportRepository);
  const weatherService = new WeatherService(weatherRepository);
  const uploadService = new UploadService(uploadRepository);

  const alertEvaluationDeps: AlertEvaluationDeps = {
    climbingSpotAlertRepository,
    climbingSpotRepository,
    notificationService,
    weatherService,
  };
  const alertEvaluationService = new AlertEvaluationService(alertEvaluationDeps);

  return {
    // repositories (for tests / advanced jobs)
    articleRepository,
    talkRepository,
    tagRepository,
    climbingSpotRepository,
    climbingSpotAlertRepository,
    climbingSpotConditionRepository,
    notificationRepository,
    reportRepository,
    weatherRepository,
    uploadRepository,
    articleService,
    talkService,
    tagService,
    climbingSpotService,
    climbingSpotAlertService,
    climbingSpotConditionService,
    notificationService,
    reportService,
    weatherService,
    uploadService,
    alertEvaluationService,
  };
}

export type AppContainer = ReturnType<typeof createContainer>;

/** Application singleton (composition root). */
export const container = createContainer();

export const {
  articleService,
  talkService,
  tagService,
  climbingSpotService,
  climbingSpotAlertService,
  climbingSpotConditionService,
  notificationService,
  reportService,
  weatherService,
  uploadService,
  alertEvaluationService,
  articleRepository,
  talkRepository,
  tagRepository,
  climbingSpotRepository,
  climbingSpotAlertRepository,
  climbingSpotConditionRepository,
  notificationRepository,
  reportRepository,
  weatherRepository,
  uploadRepository,
} = container;
