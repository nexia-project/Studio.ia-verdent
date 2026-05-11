import type { ToolDefinition } from './openrouter';

// Import all tool definitions
import { explainConceptTool, executeExplainConcept } from './tools/explain-concept';
import { solveExerciseTool, executeSolveExercise } from './tools/solve-exercise';
import { generateQuizTool, executeGenerateQuiz } from './tools/generate-quiz';
import { createFlashcardTool, executeCreateFlashcard } from './tools/create-flashcard';
import { generateMindmapTool, executeGenerateMindmap } from './tools/generate-mindmap';
import { correctEssayTool, executeCorrectEssay } from './tools/correct-essay';
import { createStudyPlanTool, executeCreateStudyPlan } from './tools/create-study-plan';
import { simulateExamTool, executeSimulateExam } from './tools/simulate-exam';
import { searchKnowledgeTool, executeSearchKnowledge } from './tools/search-knowledge';
import { summarizeContentTool, executeSummarizeContent } from './tools/summarize-content';
import { generateImageTool, executeGenerateImage } from './tools/generate-image';
import { textToSpeechTool, executeTextToSpeech } from './tools/text-to-speech';
import { speechToTextTool, executeSpeechToText } from './tools/speech-to-text';
import { generateSlidesTool, executeGenerateSlides } from './tools/generate-slides';
import { createActivityTool, executeCreateActivity } from './tools/create-activity';
import { analyzePerformanceTool, executeAnalyzePerformance } from './tools/analyze-performance';
import { suggestResourcesTool, executeSuggestResources } from './tools/suggest-resources';
import { explainWithAnalogyTool, executeExplainWithAnalogy } from './tools/explain-with-analogy';
import { createTimelineTool, executeCreateTimeline } from './tools/create-timeline';
import { debateTopicTool, executeDebateTopic } from './tools/debate-topic';
import { motivateStudentTool, executeMotivateStudent } from './tools/motivate-student';
import { trackProgressTool, executeTrackProgress } from './tools/track-progress';

// Export all tool definitions
export const tools: ToolDefinition[] = [
  explainConceptTool,
  solveExerciseTool,
  generateQuizTool,
  createFlashcardTool,
  generateMindmapTool,
  correctEssayTool,
  createStudyPlanTool,
  simulateExamTool,
  searchKnowledgeTool,
  summarizeContentTool,
  generateImageTool,
  textToSpeechTool,
  speechToTextTool,
  generateSlidesTool,
  createActivityTool,
  analyzePerformanceTool,
  suggestResourcesTool,
  explainWithAnalogyTool,
  createTimelineTool,
  debateTopicTool,
  motivateStudentTool,
  trackProgressTool,
];

// Tool execution registry
export const toolExecutors: Record<string, (args: any) => Promise<any>> = {
  explain_concept: executeExplainConcept,
  solve_exercise: executeSolveExercise,
  generate_quiz: executeGenerateQuiz,
  create_flashcard: executeCreateFlashcard,
  generate_mindmap: executeGenerateMindmap,
  correct_essay: executeCorrectEssay,
  create_study_plan: executeCreateStudyPlan,
  simulate_exam: executeSimulateExam,
  search_knowledge: executeSearchKnowledge,
  summarize_content: executeSummarizeContent,
  generate_image: executeGenerateImage,
  text_to_speech: executeTextToSpeech,
  speech_to_text: executeSpeechToText,
  generate_slides: executeGenerateSlides,
  create_activity: executeCreateActivity,
  analyze_performance: executeAnalyzePerformance,
  suggest_resources: executeSuggestResources,
  explain_with_analogy: executeExplainWithAnalogy,
  create_timeline: executeCreateTimeline,
  debate_topic: executeDebateTopic,
  motivate_student: executeMotivateStudent,
  track_progress: executeTrackProgress,
};

// Execute a tool by name
export async function executeTool(toolName: string, args: any): Promise<any> {
  const executor = toolExecutors[toolName];
  if (!executor) {
    throw new Error(`Tool not found: ${toolName}`);
  }
  return executor(args);
}