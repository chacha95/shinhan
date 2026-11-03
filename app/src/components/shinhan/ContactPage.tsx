'use client';

// CONTACT — Figma 11/03 '신한네트웍스 CONTACT'
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SubPage, SubHero } from './SubPage';

const fields = [
  { name: 'company', label: '회사명', placeholder: '회사명을 입력해 주세요.', type: 'text', half: true },
  { name: 'person', label: '담당자명', placeholder: '담당자명을 입력해 주세요.', type: 'text', half: true },
  { name: 'email', label: '이메일', placeholder: 'example@company.com', type: 'email', half: true },
  { name: 'phone', label: '연락처', placeholder: '010-0000-0000', type: 'tel', half: true },
  { name: 'subject', label: '문의 제목', placeholder: '문의 제목을 입력해 주세요.', type: 'text', half: false },
] as const;

const direct = [
  { k: 'EMAIL', v: '대표 이메일 정보 준비 중' },
  { k: 'TEL', v: '대표 전화번호 정보 준비 중' },
  { k: 'HOURS', v: '운영 시간 정보 준비 중' },
];

const inputCls =
  'w-full border border-[#E3E9F0] bg-white px-4 py-3.5 text-[14px] outline-none transition-colors placeholder:text-[#B5BDC8] focus:border-[#1F7AE0]';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SubPage active="CONTACT">
      <SubHero
        eyebrow="BUSINESS CONTACT"
        title="문의"
        desc={'신한네트웍스는 의료기기 분야의 전문성과 네트워크를 바탕으로\n다양한 파트너와 함께 새로운 가능성을 만들어갑니다.'}
      />

      {/* CONTACT FORM — 비즈니스 문의 버튼은 /contact#form 으로 바로 연결 */}
      <section id="form" className="scroll-mt-[77px] bg-white px-6 py-[120px]">
        <div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-[1fr_1.3fr]">
          <div data-reveal>
            <p className="t-eyebrow text-[#1F7AE0]">CONTACT FORM</p>
            <h2 className="t-display-md mt-3">문의 내용을 남겨주세요.</h2>
            <p className="t-body-md mt-5 text-[#666]">
              보내주신 내용은 담당자가 확인한 후
              <br />
              빠르게 답변드리겠습니다.
            </p>
            <p className="t-body-sm mt-10 max-w-[320px] border-t border-[#E3E9F0] pt-6 text-[#666]">
              <span className="text-[#1F7AE0]">*</span> 표시는 필수 입력 항목입니다.
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
            {fields.map((f) => (
              <label key={f.name} className={f.half ? 'col-span-2 sm:col-span-1' : 'col-span-2'}>
                <span className="t-nav mb-2 block !font-bold">
                  {f.label} <span className="text-[#1F7AE0]">*</span>
                </span>
                <input name={f.name} type={f.type} required placeholder={f.placeholder} className={inputCls} />
              </label>
            ))}
            <label className="col-span-2">
              <span className="t-nav mb-2 block !font-bold">
                문의 내용 <span className="text-[#1F7AE0]">*</span>
              </span>
              <textarea name="message" required rows={6} placeholder="문의하실 내용을 자세히 입력해 주세요." className={`${inputCls} resize-none`} />
            </label>
            <div className="col-span-2 flex items-center justify-between">
              <label className="t-body-sm flex items-center gap-3 text-[#333]">
                <input type="checkbox" required className="h-4 w-4 accent-[#1F7AE0]" />
                <span>
                  <b className="text-[#1F7AE0]">[필수]</b> 개인정보 수집·이용에 동의합니다.
                </span>
              </label>
              <button type="button" className="t-body-sm border-b border-[#999] text-[#666]">
                내용보기
              </button>
            </div>
            <div className="col-span-2 flex items-center justify-end gap-6">
              {sent && <p className="t-body-sm text-[#1F7AE0]">시안 단계라 실제 전송은 아직 연결되지 않았습니다.</p>}
              <button type="submit" className="t-button inline-flex items-center gap-4 bg-[#1F7AE0] px-8 py-4 text-white transition-colors hover:bg-[#1a6bc6]">
                문의 보내기 <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* DIRECT CONTACT */}
      <section className="bg-[#F8FBFF] px-6 py-[120px]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 md:grid-cols-2">
          <div data-reveal>
            <p className="t-eyebrow text-[#1F7AE0]">DIRECT CONTACT</p>
            <h2 className="t-display-md mt-3">
              보다 자세한 상담이
              <br />
              필요하신가요?
            </h2>
            <p className="t-body-md mt-5 text-[#666]">편리한 채널로 연락해 주세요. 담당자가 확인 후 안내드립니다.</p>
          </div>
          <dl className="border-t-2 border-[#71B4FE]/50" data-reveal="0.1">
            {direct.map((r) => (
              <div key={r.k} className="grid grid-cols-2 border-b border-[#E3E9F0] bg-white px-4 py-5">
                <dt className="t-tag !tracking-normal text-[#1F7AE0]">{r.k}</dt>
                <dd className="t-body-sm text-[#666]">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </SubPage>
  );
}
