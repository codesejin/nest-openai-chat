import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import * as fs from 'fs';
import * as path from 'path';

const configuration = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.API_KEY // 본인 apiKey
})

const openai = new OpenAIApi(configuration);

@Injectable()
export class AppService {
  async getHello() {

    console.log(process.env.ORGANIZATION)
    console.log(process.env.API_KEY)
    
    const configFilePath = path.resolve(__dirname, '..', 'data-config.json');

    // data-config 파일을 읽어와서 JSON 형식의 객체로 변환
    const columns = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));

    const prompt = `나는 인공지능 AI Chatbot이야. 질문을 하면 내가 답변을 해줄께. 만약 모른다면 "모름"이라고 할께.
    \n\nQ: ${JSON.stringify(columns)} 해당 data-config 를 보고 임시 데이터 10개를 json 형식으로 만들어줘
    A:`;

    const response = await openai.createCompletion({
      // chat-gpt 언어 모델
      model: "text-davinci-003",
      // 프롬프트 명령어
      prompt: prompt,
      // 정직한 답변은 0, 상상력 발휘하기 원하면 2 이상
      temperature: 0,
      // 1024가 설정 기본값, 이상을 넘어가면 과금
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });

    // Gpt응답값으로 받은 데이터 추출
    const jsonData = response.data.choices[0].text;
    // JSON 형식의 객체로 변환
    const dataObj = JSON.parse(jsonData);
    
    // 파일을 저장할 디렉토리 경로 설정
    const saveDirectory = path.resolve(__dirname, '..', 'dummy');
    if (!fs.existsSync(saveDirectory)) {
      // 디렉토리가 존재하지 않으면 디렉토리 생성
      fs.mkdirSync(saveDirectory);
    }

    // 파일 이름 설정
    let defaultName = 'dummy';
    let fileIndex = 1;
    let fileName = `${defaultName}_${fileIndex}.json`;

    if (fs.existsSync(path.join(saveDirectory, fileName))) {
      fileIndex++;
      fileName = `${defaultName}_${fileIndex}.json`;
    }

    // 파일 경로 설정
    const filePath = path.join(saveDirectory, fileName);

    // JSON 형식으로 변환된 데이터를 파일에 저장 (정렬 옵션 적용)
    fs.writeFileSync(filePath, JSON.stringify(dataObj, null, 2));

    console.log(dataObj);
    return { result: dataObj };
  }
}
