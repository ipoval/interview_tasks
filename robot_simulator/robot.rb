# encoding: utf-8

require_relative 'grid'

class Robot
  attr_accessor :x, :y, :directions, :grid

  def initialize(_x = 0, _y = 0, _direction = 'NORTH')
    @grid = Grid.instance
    @directions = self.class.directions.clone
    place _x, _y, _direction
  end

  COMMANDS = Object.new
  def COMMANDS.list; %w(MOVE LEFT RIGHT PLACE REPORT); end

  DIRECTIONS = Object.new
  def DIRECTIONS.list; @list ||= %w(NORTH WEST SOUTH EAST); end
  def DIRECTIONS.turn_left!; list.rotate!; end
  def DIRECTIONS.turn_right!; list.rotate!(-1); end

  class << self
    def commands; COMMANDS.list; end
    def directions; DIRECTIONS; end
  end

  def direction; directions.list.first; end

  def command(*cmd)
    return unless correct_command? cmd

    case cmd.first
    when 'PLACE'  then place(Integer(cmd[1]), Integer(cmd[2]), cmd[3])
    when 'MOVE'   then move
    when 'LEFT'   then turn_left
    when 'RIGHT'  then turn_right
    when 'REPORT' then report
    end
  end

  private

  def place(_x, _y, _direction)
    if directions.list.include?(_direction) && grid.inside?(_x, _y)
      @x, @y = _x, _y

      directions.turn_left! until direction.eql? _direction
    end
  end

  def turn_left
    directions.turn_left!
  end

  def turn_right
    directions.turn_right!
  end

  def move
    inside_grid do
      case direction
      when 'NORTH'
        self.y += 1
      when 'WEST'
        self.x -= 1
      when 'SOUTH'
        self.y -= 1
      when 'EAST'
        self.x += 1
      end
    end
  end

  def inside_grid
    prev_x, prev_y = self.x, self.y
    yield
    self.x, self.y = prev_x, prev_y unless grid.inside?(self.x, self.y)
  end

  def correct_command?(cmd)
    self.class.commands.include? cmd.first
  end

  def report
    puts 'Output: %s,%s,%s' % [x, y, direction]
  end

end
