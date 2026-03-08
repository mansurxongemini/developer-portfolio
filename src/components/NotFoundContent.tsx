"use client";

import { Column, Heading, Text } from "@once-ui-system/core";
import { useI18n } from "@/components/I18nProvider";

export function NotFoundContent() {
  const { content } = useI18n();

  return (
    <Column as="section" fill center paddingBottom="160">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        {content.ui.page_not_found}
      </Heading>
      <Text onBackground="neutral-weak">{content.ui.page_not_found_desc}</Text>
    </Column>
  );
}
