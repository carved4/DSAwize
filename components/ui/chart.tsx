'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import type { ResponsiveContainerProps } from 'recharts';
import clsx from 'clsx'; // Ensure this is installed or replace with your own utility

// Format: { THEME_NAME: CSS_SELECTOR }
export const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
    theme?: Record<keyof typeof THEMES, string>;
  };
};

export type ChartContextProps = {
  config: ChartConfig;
};

export const ChartContext = React.createContext<ChartContextProps | null>(null);

export function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

export function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const payloadPayload =
    payload && typeof payload === 'object' && 'payload' in payload
      ? (payload as { payload: unknown }).payload
      : undefined;

  let configLabelKey: string = key;

  if (
    payload &&
    typeof payload === 'object' &&
    key in payload &&
    typeof (payload as Record<string, unknown>)[key] === 'string'
  ) {
    configLabelKey = (payload as Record<string, string>)[key];
  } else if (
    payloadPayload &&
    typeof payloadPayload === 'object' &&
    key in payloadPayload &&
    typeof (payloadPayload as Record<string, unknown>)[key] === 'string'
  ) {
    configLabelKey = (payloadPayload as Record<string, string>)[key];
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export const ChartStyle = ({
  id,
  config,
}: {
  id: string;
  config: ChartConfig;
}) => {
  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.theme || itemConfig.color
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof THEMES] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join('\n')}
}
`
          )
          .join('\n'),
      }}
    />
  );
};

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    config: ChartConfig;
    children:
      | React.ReactNode
      | ((props: ResponsiveContainerProps) => React.ReactElement);
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId}`;

  const renderContent = React.useMemo(() => {
    if (typeof children === 'function') {
      const childrenElement = children({ 
        width: '100%', 
        height: '100%', 
        children: null as unknown as React.ReactElement 
      });
      return childrenElement;
    }
    return children;
  }, [children]);

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        id={chartId}
        className={clsx('relative', className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
          {React.isValidElement(renderContent) ? renderContent : React.createElement('div', {}, renderContent)}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

ChartContainer.displayName = 'ChartContainer';

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<'div'> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: 'line' | 'dot' | 'dashed';
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active = false,
      payload = [],
      className,
      indicator = 'dot',
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo<React.ReactElement | null>(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || 'value'}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === 'string'
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        const formattedLabel = labelFormatter(value, payload);
        return formattedLabel ? (
          <div className={clsx('font-medium', labelClassName)}>
            {formattedLabel}
          </div>
        ) : null;
      }

      if (!value) {
        return null;
      }

      return <div className={clsx('font-medium', labelClassName)}>{value}</div>;
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== 'dot';

    return (
      <div
        ref={ref}
        className={clsx(
          'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || 'value'}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload?.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={clsx(
                  'flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground',
                  indicator === 'dot' && 'items-center'
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={clsx(
                            'shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]',
                            {
                              'h-2.5 w-2.5': indicator === 'dot',
                              'w-1': indicator === 'line',
                              'w-0 border-[1.5px] border-dashed bg-transparent':
                                indicator === 'dashed',
                              'my-0.5': nestLabel && indicator === 'dashed',
                            }
                          )}
                          style={
                            {
                              '--color-bg': indicatorColor,
                              '--color-border': indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={clsx(
                        'flex flex-1 justify-between leading-none',
                        nestLabel ? 'items-end' : 'items-center'
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

ChartTooltipContent.displayName = 'ChartTooltipContent';
