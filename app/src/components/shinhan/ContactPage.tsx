'use client';

// CONTACT — Figma 11/03 '신한네트웍스 CONTACT'
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SubPage, SubHero } from './SubPage';
import { useLang } from './i18n';

const fields = [
  { name: 'company', type: 'text', half: true },
  { name: 'person', type: 'text', half: true },
  { name: 'email', type: 'email', half: true },
  { name: 'phone', type: 'tel', half: true },
  { name: 'subject', type: 'text', half: false },
] as const;

const directKeys = ['EMAIL', 'TEL', 'HOURS'];

const T = {
  ko: {
    hero: { title: '문의', desc: '신한네트웍스는 의료기기 분야의 전문성과 네트워크를 바탕으로\n다양한 파트너와 함께 새로운 가능성을 만들어갑니다.' },
    form: {
      title: '문의 내용을 남겨주세요.',
      desc: ['보내주신 내용은 담당자가 확인한 후', '빠르게 답변드리겠습니다.'],
      required: ' 표시는 필수 입력 항목입니다.',
      fields: [
        ['회사명', '회사명을 입력해 주세요.'],
        ['담당자명', '담당자명을 입력해 주세요.'],
        ['이메일', 'example@company.com'],
        ['연락처', '010-0000-0000'],
        ['문의 제목', '문의 제목을 입력해 주세요.'],
      ],
      message: ['문의 내용', '문의하실 내용을 자세히 입력해 주세요.'],
      agree: ['[필수]', ' 개인정보 수집·이용에 동의합니다.'],
      view: '내용보기',
      sent: '시안 단계라 실제 전송은 아직 연결되지 않았습니다.',
      submit: '문의 보내기',
    },
    direct: {
      title: ['보다 자세한 상담이', '필요하신가요?'],
      desc: '편리한 채널로 연락해 주세요. 담당자가 확인 후 안내드립니다.',
      rows: ['대표 이메일 정보 준비 중', '대표 전화번호 정보 준비 중', '운영 시간 정보 준비 중'],
    },
  },
  en: {
    hero: { title: 'Contact Us', desc: 'Drawing on our expertise and network in the medical device industry,\nShinhan Networks creates new possibilities together with a diverse range of partners.' },
    form: {
      title: 'Tell Us How We Can Help.',
      desc: ['Our team will review your inquiry', 'and respond promptly.'],
      required: ' Fields marked are required.',
      fields: [
        ['Company Name', 'Enter your company name.'],
        ['Contact Name', 'Enter your name.'],
        ['Email', 'example@company.com'],
        ['Phone Number', '+82 10-0000-0000'],
        ['Inquiry Subject', 'Enter the subject of your inquiry.'],
      ],
      message: ['Inquiry Details', 'Please describe your inquiry in detail.'],
      agree: ['[Required]', ' I agree to the collection and use of my personal information.'],
      view: 'View Details',
      sent: 'This is a design preview — submissions are not connected yet.',
      submit: 'Submit',
    },
    direct: {
      title: ['Need More In-Depth', 'Assistance?'],
      desc: 'Contact us through your preferred channel, and our team will assist you after reviewing your request.',
      rows: ['Email address to be announced.', 'Phone number to be announced.', 'Business hours to be announced.'],
    },
  },
};

const inputCls =
  'w-full border border-[#E3E9F0] bg-white px-4 py-3.5 text-[14px] outline-none transition-colors placeholder:text-[#B5BDC8] focus:border-[#1F7AE0]';

export default function ContactPage() {
  const t = T[useLang()];
  const [sent, setSent] = useState(false);

  return (
    <SubPage active="CONTACT">
      <SubHero
        eyebrow="BUSINESS CONTACT"
        title={t.hero.title}
        desc={t.hero.desc}
      />

      {/* CONTACT FORM — 비즈니스 문의 버튼은 /contact#form 으로 바로 연결 */}
      <section id="form" className="scroll-mt-[60px] md:scroll-mt-[77px] bg-white px-6 py-[72px] md:py-[120px]">
        <div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[1fr_1.3fr]">
          <div data-reveal>
            <p className="t-eyebrow text-[#1F7AE0]">CONTACT FORM</p>
            <h2 className="t-display-md mt-3">{t.form.title}</h2>
            <p className="t-body-md mt-5 text-[#666]">
              {t.form.desc[0]}
              <br />
              {t.form.desc[1]}
            </p>
            <p className="t-body-sm mt-10 max-w-[320px] border-t border-[#E3E9F0] pt-6 text-[#666]">
              <span className="text-[#1F7AE0]">*</span>{t.form.required}
            </p>
          </div>

          <form
            data-reveal="0.1"
            className="grid grid-cols-2 gap-x-4 gap-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {fields.map((f, i) => (
              <label key={f.name} className={f.half ? 'col-span-2 sm:col-span-1' : 'col-span-2'}>
                <span className="t-nav mb-2 block !font-bold">
                  {t.form.fields[i][0]} <span className="text-[#1F7AE0]">*</span>
                </span>
                <input name={f.name} type={f.type} required placeholder={t.form.fields[i][1]} className={inputCls} />
              </label>
            ))}
            <label className="col-span-2">
              <span className="t-nav mb-2 block !font-bold">
                {t.form.message[0]} <span className="text-[#1F7AE0]">*</span>
              </span>
              <textarea name="message" required rows={6} placeholder={t.form.message[1]} className={`${inputCls} resize-none`} />
            </label>
            <div className="col-span-2 flex items-center justify-between">
              <label className="t-body-sm flex items-center gap-3 text-[#333]">
                <input type="checkbox" required className="h-4 w-4 accent-[#1F7AE0]" />
                <span>
                  <b className="text-[#1F7AE0]">{t.form.agree[0]}</b>{t.form.agree[1]}
                </span>
              </label>
              <button type="button" className="t-body-sm border-b border-[#999] text-[#666]">
                {t.form.view}
              </button>
            </div>
            <div className="col-span-2 flex flex-col-reverse items-stretch justify-end gap-4 md:flex-row md:items-center md:gap-6">
              {sent && <p className="t-body-sm text-[#1F7AE0]">{t.form.sent}</p>}
              <button type="submit" className="t-button inline-flex w-full items-center justify-center gap-4 bg-[#1F7AE0] px-8 py-4 text-white transition-colors hover:bg-[#1a6bc6] md:w-auto">
                {t.form.submit} <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* DIRECT CONTACT */}
      <section className="bg-[#F8FBFF] px-6 py-[72px] md:py-[120px]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 md:grid-cols-2">
          <div data-reveal>
            <p className="t-eyebrow text-[#1F7AE0]">DIRECT CONTACT</p>
            <h2 className="t-display-md mt-3">
              {t.direct.title[0]}
              <br />
              {t.direct.title[1]}
            </h2>
            <p className="t-body-md mt-5 text-[#666]">{t.direct.desc}</p>
          </div>
          <dl className="border-t-2 border-[#71B4FE]/50" data-reveal="0.1">
            {directKeys.map((k, i) => (
              <div key={k} className="grid grid-cols-2 border-b border-[#E3E9F0] bg-white px-4 py-5">
                <dt className="t-tag !tracking-normal text-[#1F7AE0]">{k}</dt>
                <dd className="t-body-sm text-[#666]">{t.direct.rows[i]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </SubPage>
  );
}
