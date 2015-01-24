# encoding: utf-8

class Rover
  attr_accessor :x, :y, :directions

  def initialize(the_x = 0, the_y = 0, the_direction = 'N')
    @x, @y, @initial_direction = the_x, the_y, the_direction
    @directions = self.class.directions.clone
    _turn_to_initial_direction
  end

  COMMANDS = Object.new
  def COMMANDS.list; %w(L R M); end

  DIRECTIONS = Object.new
  def DIRECTIONS.list; @list ||= %w(N W S E); end
  def DIRECTIONS.turn_left!; list.rotate!; end
  def DIRECTIONS.turn_right!; list.rotate!(-1); end

  class << self
    def commands; COMMANDS.list; end
    def directions; DIRECTIONS; end
  end

  def direction; directions.list.first; end

  def command(cmd_str)
    cmd_str.chars do |cmd|
      case cmd
      when 'L' then _turn_left
      when 'R' then _turn_right
      when 'M' then _move
      else raise ArgumentError
      end
    end
  end

  private

  def _turn_to_initial_direction
    raise ArgumentError unless directions.list.include? direction
    directions.turn_left! until direction.eql? @initial_direction
  end

  def _turn_left; directions.turn_left!; end
  def _turn_right; directions.turn_right!; end

  def _move
    case direction
    when 'N' then self.y += 1
    when 'W' then self.x -= 1
    when 'S' then self.y -= 1
    when 'E' then self.x += 1
    end
  end
end
