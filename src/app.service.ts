import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: "", 
  apiKey: "" // 본인 apiKey
})

const openai = new OpenAIApi(configuration);

@Injectable()
export class AppService {
  async getHello() {
    const response = await openai.createCompletion({
      // chat-gpt 언어 모델
      model: "text-davinci-003",
      // 명령어
      prompt: "나는 인공지능 AI Chatbot이야. 질문을 하면 내가 답변을 해줄께. 만약 모른다면 \"모름\"이라고 할께." + 
      "\n\nQ: 한국인의 평균연령을 계산해줘\nA:",
      //User 테이블에 이메일, 이름, 비밀번호를 insert하는 sql 명령어를 알려줘
      // 정직한 답변은 0, 상상력 발휘하기 원하면 2 이상
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });

    console.log( response.data.choices[0].text);
    return { result: response.data.choices[0].text };
  }
}
